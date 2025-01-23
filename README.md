# InteractiveImageMap

**InteractiveImageMap** is a lightweight JavaScript library that allows you to create interactive image maps with customizable points and tooltips. Easily add, update, or remove points on an image and display tooltips with custom content.

---

## Features

- Add interactive points on images with customizable tooltips.
- Tooltips remain within the boundaries of the image container.
- Handle events such as clicks on points.
- Support for custom CSS classes for styling points and tooltips.
- Enable selection mode to retrieve coordinates from user clicks.
- Manage points using unique IDs.

---

## Installation

Simply include the library in your project:

### Using a `<script>` tag
Download or include the library file in your HTML:
```html
<script src="InteractiveImageMap.js"></script>
```

## Using a module bundler
### You can import the library into your project:

```javascript
import InteractiveImageMap from './InteractiveImageMap.js';
```

## Usage
### 1. Basic Setup
Create an image container with an image inside it:

```html
<div id="image-container">
    <img src="example.jpg" alt="Example Image" />
</div>
```

Initialize the InteractiveImageMap:

```javascript
const container = document.getElementById("image-container");
const imageMap = new InteractiveImageMap(container);
```

### 2. Add Points
Add points with customizable properties:

```javascript
imageMap.addPoint({
    id: "point1",
    x: 50, // X-coordinate (percentage of image width)
    y: 30, // Y-coordinate (percentage of image height)
    pointClass: "custom-point", // CSS class for the point
    tooltipClass: "custom-tooltip", // CSS class for the tooltip
    tooltipContent: "This is an interactive point!", // Tooltip content
    onClick: () => alert("You clicked the point!") // Callback for point click
});
```
### 3. Remove Points
Remove a point by its unique ID:

```javascript
imageMap.removePoint("point1");
```

### 4. Clear All Points
Remove all points from the image:

```javascript
imageMap.clearPoints();
```

### 5. Enable Selection Mode
Enable selection mode to retrieve coordinates of user clicks:

```javascript
imageMap.enableSelectionMode(({ x, y }) => {
    console.log(`Coordinates: X=${x}, Y=${y}`);
    imageMap.disableSelectionMode(); // Disable selection mode after use
});
```

## API Reference
### Constructor
```javascript
new InteractiveImageMap(container)
```
container: The HTML element containing the image. It must contain an <img> element.
### Methods

`addPoint(options)`

Add an interactive point on the image.

**Parameters**:
id (string, required): Unique identifier for the point.
x (number, required): X-coordinate as a percentage of the image width.
y (number, required): Y-coordinate as a percentage of the image height.
pointClass (string, optional): CSS class for the point element.
tooltipClass (string, optional): CSS class for the tooltip element.
tooltipContent (string|HTMLElement, optional): Content for the tooltip.
onClick (function, optional): Callback function for point click events.

`removePoint(id)`

Remove a point by its unique ID.

**Parameters**:
id (string, required): The ID of the point to remove.

`clearPoints()`
Remove all points from the image.
`enableSelectionMode(callback)`
Enable selection mode to retrieve coordinates of user clicks.

**Parameters**:
callback (function, required): Function that receives an object with x and y coordinates.
disableSelectionMode()
Disable selection mode.

**Styling**
You can customize the appearance of points and tooltips by using CSS classes.

### Example CSS
```css
.custom-point {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
}

.custom-tooltip {
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 3px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
}
```

## Example
Here's a complete example:

```html
<div id="image-container">
    <img src="example.jpg" alt="Example Image" />
</div>
<script src="InteractiveImageMap.js"></script>
<script>
    const container = document.getElementById("image-container");
    const imageMap = new InteractiveImageMap(container);

    imageMap.addPoint({
        id: "point1",
        x: 50,
        y: 30,
        pointClass: "custom-point",
        tooltipClass: "custom-tooltip",
        tooltipContent: "This is an interactive point!",
        onClick: () => alert("You clicked the point!")
    });

    imageMap.enableSelectionMode(({ x, y }) => {
        console.log(`Selected coordinates: X=${x}, Y=${y}`);
    });
</script>
```

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve this library.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
