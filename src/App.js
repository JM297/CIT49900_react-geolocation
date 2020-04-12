import React from 'react';
import './App.css';

export default function App() {

    const [position, setPosition] = React.useState({});
    const [goal, setGoal] = React.useState("");
    const [error, setError] = React.useState(null);
    const [color, setColor] = React.useState("red");
    const [destination, setDestination] = React.useState({
        x:39.768996942,
        y:-86.17166598
    });
    const hitbox = {
        height:100,
        width:100,
        backgroundColor:color
    };

    const onChange = ({coords}) => {
        setPosition({
            x:coords.latitude,
            y:coords.longitude
        });
        console.log(coords);
    };

    const onError = ((error) => {
       setError(error.message)
    });

    React.useEffect(() => {
        const geo = navigator.geolocation;
        if(!geo){
            setError("Hey, this isn't working!");
            return;
        }
        if(position.x === destination.x && position.y === destination.y){
            setColor("green");
            setGoal("You have arrived");
        } else{
            setColor("red");
            setGoal("Not close");
        }
        let watcher = geo.watchPosition(onChange,onError);
        return () => geo.clearWatch(watcher);
    },[destination,position]);
    console.log(destination.x);
    console.log(position.x);

  return (
    <div className="App">
      <header className="App-header">
          <p>
            Latitude: {position.x}&#176;
          </p>
          <p>
              Longitude: {position.y}&#176;
          </p>
          <p>{goal}</p>
          <p>{error}</p>
          <div style={hitbox}/>
      </header>
    </div>
  );
}
