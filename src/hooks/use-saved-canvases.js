import React from 'react';

export default function useSavedCanvases() {
  const [canvases, setCanvases] = React.useState(
    window.localStorage.getItem('saCanvases')
      ? JSON.parse(window.localStorage.getItem('saCanvases'))
      : {}
  );

  const updateCanvas = ({ key, fabricCanvas }) => {
    console.log('key', key);
    console.log('fabricCanvas', fabricCanvas);

    let newCanvases = { ...canvases, [key]: fabricCanvas };
    setCanvases({ ...newCanvases });
    window.localStorage.setItem(
      'saCanvases',
      JSON.stringify({ ...newCanvases })
    );
  };

  return { canvases, updateCanvas };
}
