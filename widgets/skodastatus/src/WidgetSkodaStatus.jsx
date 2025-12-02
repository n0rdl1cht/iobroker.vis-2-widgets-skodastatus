import React from 'react';
import { useIoBrokerState } from '@iobroker/vis-2-widgets-react-dev';
import './WidgetSkodaStatus.css';

export default function WidgetSkodaStatus({ widget }) {

    const vehicle = widget.data.vehiclePrefix;
    const skoda = widget.data.userdataPrefix;

    const s = suffix => useIoBrokerState(suffix);

    const carCapturedTimestamp = s(`${vehicle}.status.vehicle-status.carCapturedTimestamp`);
    const totalRange = s(`${vehicle}.status.vehicle-status.driving-range.totalRangeInKm`);
    const adblueRange = s(`${vehicle}.status.vehicle-status.driving-range.adBlueRange`);
    const doorsLocked = s(`${vehicle}.status.vehicle-status.overall.doorsLocked`);
    const windows = s(`${vehicle}.status.vehicle-status.overall.windows`);
    const lights = s(`${vehicle}.status.vehicle-status.overall.lights`);
    const isMoving = s(`${vehicle}.status.position.isMoving`);
    const address = s(`${vehicle}.status.position.parkingPosition.formattedAddress`);
    const lat = s(`${vehicle}.status.position.parkingPosition.gpsCoordinates.latitude`);
    const lon = s(`${vehicle}.status.position.parkingPosition.gpsCoordinates.longitude`);

    const kmErwartet = s(`${skoda}.Erwarteter_km-Stand`);
    const km40000 = s(`${skoda}.Aufgebraucht_am`);
    const kostenTotal = s(`${skoda}.Kosten_Mehr-/Minderkilometer`);
    const kostenMonat = s(`${skoda}.Kosten_Mehr-/Minderkilometer_(Monat)`);

    return (
        <div style={{ color: 'inherit', backgroundColor: 'inherit' }}>
            <div className="widget">
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Status</span>

                <div className="widget-row"><i className="mdi mdi-clock-outline"></i><span><strong>Letzte Aktualisierung:</strong> {carCapturedTimestamp.val}</span></div>
                <div className="widget-row"><i className="mdi mdi-gas-station"></i><span><strong>Reichweite:</strong> {totalRange.val} km</span></div>
                <div className="widget-row"><i className="mdi mdi-water"></i><span><strong>AdBlue-Reichweite:</strong> {adblueRange.val} km</span></div>
                <div className="widget-row"><i className="mdi mdi-car-door-lock"></i><span><strong>Türen verschlossen:</strong> {doorsLocked.val}</span></div>
                <div className="widget-row"><i className="mdi mdi-car-door"></i><span><strong>Fenster geschlossen:</strong> {windows.val}</span></div>
                <div className="widget-row"><i className="mdi mdi-lightbulb-off-outline"></i><span><strong>Lichter aus:</strong> {lights.val}</span></div>
                <div className="widget-row"><i className="mdi mdi-motion"></i><span><strong>Fahrzeug in Bewegung:</strong> {isMoving.val}</span></div>
                <div className="widget-row"><i className="mdi mdi-parking"></i><span><strong>Parkposition:</strong> {address.val}</span></div>

                <div style={{ width: '100%', height: 200, overflow: 'hidden', borderRadius: 8 }}>
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0, pointerEvents: 'none' }}
                        src={`https://maps.google.com/maps?q=${lat.val},${lon.val}&z=16&output=embed&hl=de&iwloc=near`}
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <div className="widget">
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Kilometerprognose</span>

                <div className="widget-row"><i className="mdi mdi-speedometer"></i><span><strong>Erwarteter km-Stand:</strong> {kmErwartet.val}</span></div>
                <div className="widget-row"><i className="mdi mdi-calendar-clock"></i><span><strong>40.000 km erreicht am:</strong> {km40000.val}</span></div>
                <div className="widget-row"><i className="mdi mdi-cash-multiple"></i><span><strong>Gesamtkosten:</strong> {kostenTotal.val}</span></div>
                <div className="widget-row"><i className="mdi mdi-calendar-month"></i><span><strong>Kosten/Monat:</strong> {kostenMonat.val}</span></div>
            </div>

            <link href="https://cdn.materialdesignicons.com/7.2.96/css/materialdesignicons.min.css" rel="stylesheet" />
        </div>
    );
}