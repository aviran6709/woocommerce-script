import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches({socialNet} ) {
 const [tgSwitch, setTgSwitch, fbSwitch, setFbCSwitch] = socialNet

  const handleChange = (event) => {
    event.target.name === "Telegram"?
    setTgSwitch(event.target.checked):
    setFbCSwitch(event.target.checked)
    console.log(tgSwitch)
  };

  return (
    <div className='switch-box'>
      <h4>POST ON :</h4>
      <label> Telegram 📣
    <Switch
    name='Telegram'
      checked={tgSwitch}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
</label>
<label>Facebook 📣
    <Switch
     name='Facebook'
      checked={fbSwitch}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </label>
    </div>
  );
}
