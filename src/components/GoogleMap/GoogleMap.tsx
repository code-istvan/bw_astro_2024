import React from 'react';
import GoogleMapReact from 'google-map-react';
import { MiniLogo } from './MiniLogo.tsx';
import MapStyle from './MapStyle';
import './_googlemap.scss';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
  center: {
    lat: 47.51416,
    lng: 19.03734,
  },
  zoom: 15,
};

const GoogleMap = () => (
  <div className="googleMap__box container-fluid">
    <GoogleMapReact
      bootstrapURLKeys={{ key: import.meta.env.PUBLIC_GOOGLE_MAP_API_KEY }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      options={{ styles: MapStyle }}
    >
      {/* @ts-ignore */}
      <MiniLogo lat={47.51416} lng={19.03734} text={'Bandha Works'} />
    </GoogleMapReact>
  </div>
);

export default GoogleMap;
