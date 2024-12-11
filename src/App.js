import { useState, useEffect } from 'react';

const App = () => {
  const [circles, setCircles] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleClick = (e) => {
    const radius = Math.floor(Math.random() * (200 - 20 + 1)) + 20;
    const newCircle = {
      x: e.clientX,
      y: e.clientY,
      radius,
    };

    const updatedCircles = [...circles, newCircle];

    if (updatedCircles.length > 2) {
      setCircles([]);
      setIsIntersecting(false);
    } else {
      setCircles(updatedCircles);
    }
  };

  useEffect(() => {
    if (circles.length < 2) {
      setIsIntersecting(false);
      return;
    }

    const [circle1, circle2] = circles;
    const distance = Math.sqrt(
      Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2)
    );
    const combinedRadius = circle1.radius + circle2.radius;

    setIsIntersecting(distance < combinedRadius);
  }, [circles]);

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: isIntersecting ? 'red' : 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {circles.map((circle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: circle.y - circle.radius,
            left: circle.x - circle.radius,
            width: circle.radius * 2,
            height: circle.radius * 2,
            borderRadius: '50%',
            backgroundColor: 'blue',
          }}
        ></div>
      ))}
    </div>
  );
};

export default App;
