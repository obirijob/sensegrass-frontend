import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faBars,
  faBell,
  faCaretDown,
  faCloudSunRain,
  faCookieBite,
  faEarthAmericas,
  faExpand,
  faGear,
  faLeaf,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Reading from '../Components/Reading';
import Map from '../Components/Map';

function Welcome({ user, logOut }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    setData(null);
    let resp = await fetch('http://localhost:2000/data');
    if (resp.ok) {
      let d = await resp.json();
      console.log(d);
      setData(d);
    }
  }
  return (
    <div className="main">
      <div className="header">
        <div className="items">
          <div className="logo">
            <img
              style={{ width: 20, height: 20 }}
              src={require('../Assets/logo.png')}
              alt="logo"
            />
            <span>SenseGrass</span>
          </div>
          <div className="menu">
            <div className="menu-item">File</div>
            <div className="menu-item">View</div>
            <div className="menu-item">Maps</div>
            <div className="menu-item">Help</div>
          </div>
        </div>
        <div className="sidebar">
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faBell} />{' '}
          </div>
          <div className="sidebar-item date">
            {moment().format('D MMM YYYY')}
          </div>
          <div className="sidebar-item" title={user.email} onClick={logOut} >{user.given_name}</div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faExpand} />
          </div>
        </div>
      </div>
      {data ? (
        <div className="content">
          <div className="sensor">
            <div className="title">Sensor</div>
            <div className="sensor-content">
              <div className="sensor-content-header">
                <div className="header-item">
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 20 }}>
                      Basic Sensor <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    <div
                      style={{
                        textTransform: 'uppercase',
                        fontSize: 13,
                        opacity: 0.6,
                        marginTop: 5,
                      }}
                    >
                      Sensor Location
                    </div>
                  </div>
                </div>
                <div className="header-item">
                  {moment().format('YYYY-MM-D | HH:mm a').toUpperCase()}{' '}
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                <div className="header-item">
                  <button>Add Sensor</button>
                </div>
              </div>
              <div className="sensor-content-body">
                <div className="readings">
                  {data.basicSensor.map(r => (
                    <Reading {...r} />
                  ))}
                </div>
                <div className="separator"></div>
                <div className="map">
                  <div className="map-area">
                    <Map
                      isMarkerShown
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=&callback=initMap`}
                      //googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `300px` }} />}
                      containerElement={<div style={{ height: `100%` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="weather">
            <div className="title">Weather</div>
            <div className="weather-content">
              <div className="weather-overview">
                <FontAwesomeIcon icon={faCloudSunRain} size="6x" />
                <div className="details">
                  <div className="temp">80° F</div>
                  <div className="description">Bright Rainny</div>
                </div>
              </div>
              <div className="weather-item">
                Precipitation Intensity: {data.precipitation.intensity}
              </div>
              <div className="weather-item">
                Precipitation Probability: {data.precipitation.probability}
              </div>
              <div className="weather-item">Pressure: {data.pressure}</div>
              <div className="weather-item">Wind Speed: {data.windSpeed}</div>
              <div className="weather-item">
                Wind Direction: {data.windDirection}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="content"> Loading...</div>
      )}
      <div className="footer">
        <div className="ask">
          <FontAwesomeIcon icon={faAdd} />
          Add Activity
        </div>
        <div className="dock">
          <div className="dock-item">
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
          <div className="dock-item">
            <FontAwesomeIcon icon={faLeaf} size="2x" />
          </div>
          <div className="dock-item">
            <FontAwesomeIcon icon={faMicrochip} size="2x" />
          </div>
          <div className="dock-item">
            <FontAwesomeIcon icon={faEarthAmericas} size="2x" />
          </div>
          <div className="dock-item">
            <FontAwesomeIcon icon={faGear} size="2x" />
          </div>
          <div className="dock-item">
            <FontAwesomeIcon icon={faCookieBite} size="2x" />
          </div>
        </div>
        <div className="ask">Ask Sana</div>
      </div>
    </div>
  );
}

export default Welcome;
