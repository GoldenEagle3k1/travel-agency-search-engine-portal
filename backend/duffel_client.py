"""
duffel_client.py  — Duffel REST API client
Proxies all Duffel calls server-side so the API key is never exposed to the browser.
"""
import os
import requests
from typing import Optional

DUFFEL_BASE = "https://api.duffel.com"
DUFFEL_VERSION = "v2"


def _headers(api_key: str) -> dict:
    return {
        "Authorization": f"Bearer {api_key}",
        "Duffel-Version": DUFFEL_VERSION,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }


def _normalize_offer(offer: dict) -> dict:
    """Flatten a Duffel offer into the shape the frontend expects."""
    try:
        slices = offer.get("slices", [])
        total_amount = float(offer.get("total_amount", 0))
        total_currency = offer.get("total_currency", "USD")

        segments_out = []
        for sl in slices[:1]:  # outbound
            for seg in sl.get("segments", []):
                segments_out.append({
                    "origin_iata": seg.get("origin", {}).get("iata_code"),
                    "origin_name": seg.get("origin", {}).get("name"),
                    "origin_city": seg.get("origin", {}).get("city_name"),
                    "dest_iata": seg.get("destination", {}).get("iata_code"),
                    "dest_name": seg.get("destination", {}).get("name"),
                    "dest_city": seg.get("destination", {}).get("city_name"),
                    "departure_time": seg.get("departing_at"),
                    "arrival_time": seg.get("arriving_at"),
                    "duration": seg.get("duration"),
                    "flight_number": (seg.get("marketing_carrier", {}).get("iata_code", "") +
                                      str(seg.get("marketing_carrier_flight_number", ""))),
                    "airline_name": seg.get("marketing_carrier", {}).get("name"),
                    "airline_iata": seg.get("marketing_carrier", {}).get("iata_code"),
                    "airline_logo": seg.get("marketing_carrier", {}).get("logo_symbol_url"),
                    "aircraft": seg.get("aircraft", {}).get("name"),
                })

        segments_ret = []
        if len(slices) > 1:
            for seg in slices[1].get("segments", []):
                segments_ret.append({
                    "origin_iata": seg.get("origin", {}).get("iata_code"),
                    "origin_name": seg.get("origin", {}).get("name"),
                    "origin_city": seg.get("origin", {}).get("city_name"),
                    "dest_iata": seg.get("destination", {}).get("iata_code"),
                    "dest_name": seg.get("destination", {}).get("name"),
                    "dest_city": seg.get("destination", {}).get("city_name"),
                    "departure_time": seg.get("departing_at"),
                    "arrival_time": seg.get("arriving_at"),
                    "duration": seg.get("duration"),
                    "flight_number": (seg.get("marketing_carrier", {}).get("iata_code", "") +
                                      str(seg.get("marketing_carrier_flight_number", ""))),
                    "airline_name": seg.get("marketing_carrier", {}).get("name"),
                    "airline_iata": seg.get("marketing_carrier", {}).get("iata_code"),
                    "airline_logo": seg.get("marketing_carrier", {}).get("logo_symbol_url"),
                    "aircraft": seg.get("aircraft", {}).get("name"),
                })

        # Stops count
        outbound_stops = max(0, len(slices[0].get("segments", [])) - 1) if slices else 0
        return_stops = max(0, len(slices[1].get("segments", [])) - 1) if len(slices) > 1 else 0

        # First & last segments for display
        first_seg = slices[0].get("segments", [{}])[0] if slices else {}
        last_seg = slices[0].get("segments", [{}])[-1] if slices else {}

        # Conditions (fare rules)
        conditions = offer.get("conditions", {})
        refundable = conditions.get("refund_before_departure", {}).get("allowed", False)
        changeable = conditions.get("change_before_departure", {}).get("allowed", False)

        # Baggage
        baggage = []
        for ps in offer.get("passengers", []):
            for ba in ps.get("baggages", []):
                baggage.append({
                    "type": ba.get("type"),
                    "quantity": ba.get("quantity"),
                })

        # Airline info from first segment
        airline = first_seg.get("marketing_carrier", {})

        return {
            "offer_id": offer.get("id"),
            "total_amount": total_amount,
            "total_currency": total_currency,
            "expires_at": offer.get("expires_at"),
            # Outbound summary
            "origin_iata": first_seg.get("origin", {}).get("iata_code"),
            "origin_city": first_seg.get("origin", {}).get("city_name"),
            "dest_iata": last_seg.get("destination", {}).get("iata_code"),
            "dest_city": last_seg.get("destination", {}).get("city_name"),
            "departure_time": first_seg.get("departing_at"),
            "arrival_time": last_seg.get("arriving_at"),
            "duration": slices[0].get("duration") if slices else None,
            "outbound_stops": outbound_stops,
            "return_stops": return_stops,
            # Airline
            "airline_name": airline.get("name"),
            "airline_iata": airline.get("iata_code"),
            "airline_logo": airline.get("logo_symbol_url"),
            # Detailed segments
            "outbound_segments": segments_out,
            "return_segments": segments_ret,
            # Fare conditions
            "refundable": refundable,
            "changeable": changeable,
            # Baggage
            "baggage": baggage,
            # Cabin class
            "cabin_class": (slices[0].get("segments", [{}])[0]
                            .get("passengers", [{}])[0]
                            .get("cabin_class", "economy")) if slices else "economy",
        }
    except Exception as e:
        return {"offer_id": offer.get("id"), "error": str(e), "raw": offer}


class DuffelClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update(_headers(api_key))

    def _get(self, path: str, params: dict = None):
        url = f"{DUFFEL_BASE}/air/{path}"
        resp = self.session.get(url, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json()

    def _post(self, path: str, payload: dict):
        url = f"{DUFFEL_BASE}/air/{path}"
        resp = self.session.post(url, json=payload, timeout=45)
        resp.raise_for_status()
        return resp.json()

    def _get_places(self, query: str):
        url = f"{DUFFEL_BASE}/places/suggestions"
        resp = self.session.get(url, params={"query": query}, timeout=10)
        resp.raise_for_status()
        return resp.json()

    def search_flights(self, slices: list, passengers: int = 1,
                       cabin_class: str = "economy") -> list:
        """
        Search for flights and return normalized offer list.
        slices: [{"origin":"LHR","destination":"DXB","departure_date":"2026-08-01"}, ...]
        """
        payload = {
            "data": {
                "slices": [
                    {
                        "origin": s["origin"],
                        "destination": s["destination"],
                        "departure_date": s["departure_date"],
                    }
                    for s in slices
                ],
                "passengers": [{"type": "adult"} for _ in range(passengers)],
                "cabin_class": cabin_class.lower().replace(" ", "_"),
            }
        }
        data = self._post("offer_requests?return_offers=true", payload)
        raw_offers = data.get("data", {}).get("offers", [])
        return [_normalize_offer(o) for o in raw_offers]

    def get_offer(self, offer_id: str) -> dict:
        """Fetch the latest details for a single offer before booking."""
        data = self._get(f"offers/{offer_id}")
        return _normalize_offer(data.get("data", {}))

    def search_places(self, query: str) -> list:
        """Airport/city autocomplete via Duffel Places API."""
        data = self._get_places(query)
        raw = data.get("data", [])
        results = []
        for place in raw:
            results.append({
                "iata_code": place.get("iata_code") or place.get("iata_city_code"),
                "name": place.get("name"),
                "city_name": place.get("city_name") or place.get("name"),
                "country_name": place.get("country_name"),
                "type": place.get("type"),  # "airport" or "city"
                "time_zone": place.get("time_zone"),
            })
        return results


# Module-level singleton — created lazily to avoid import-time errors if key missing
_client: Optional[DuffelClient] = None


def get_duffel_client() -> DuffelClient:
    global _client
    if _client is None:
        from config import DUFFEL_API_KEY
        _client = DuffelClient(DUFFEL_API_KEY)
    return _client
