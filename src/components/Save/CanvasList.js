import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

function SaveCanvasList({ canvasNames = [], handleSelectSavedCanvas }) {
  const [value, setValue] = React.useState(canvasNames[0]);
  const handleChange = e => {
    const val = e.target.value;
    setValue(val);
    if (e) {
      handleSelectSavedCanvas(val);
    }
  };

  return (
    <FormControl id="saved-user-canvases" w={600}>
      <FormLabel>Saved Canvases</FormLabel>
      <Select
        placeholder="Saved user canvases"
        onChange={handleChange}
        value={value}
      >
        {canvasNames.map(name => (
          <option key={name}>{name}</option>
        ))}
      </Select>
    </FormControl>
  );
}

SaveCanvasList.propTypes = {
  canvasNames: PropTypes.array,
  handleSelectSavedCanvas: PropTypes.func,
};

export default SaveCanvasList;
