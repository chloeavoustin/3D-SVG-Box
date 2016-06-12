# 3D-SVG-Box
This directory allows the creation of a **3D box responsive with SVG tag** via JavaScript without jQuery.

##Getting Started
Download either the **[minified version][min]** or the **[undminified version][max]** of **3D SVG BOX**.

[min]: https://raw.githubusercontent.com/chloeavoustin/3D-SVG-Box/master/js/svgbox.min.js
[max]: https://raw.githubusercontent.com/chloeavoustin/3D-SVG-Box/master/js/svgbox.js

In your web page:
```html
<!-- include SVG 3D Box -->
<script src="http://path/svgbox.min.js"></script>

...

<!-- declare a box -->
<div id="nameContainer">
    <svg id="box" 
     xmlns="http://www.w3.org/2000/svg"
     data-nb-elements="number of elements in your box"
     data-nb-columns="number of columns in your box"
     data-border-vertical="size of verticals borders in your box"
     data-border-horizontal="size of horizontal borders in your box"
     width="100%" 
     xmlns:xlink="http://www.w3.org/1999/xlink"/>
</div>
```

In your script call SVG 3D BOX:
```javaScript
svgBox("nameContainer");
```

That's it! **You don't need to use jQuery or another library to create your box**.

##Colors

For now, the color is not manageable via the parameter.
Therefore it must be changed in the declaration of the object instance and change the single line of CSS.

In svgbox.js:
```javaScript
function Box(idBox, idContainer) {
    //...
    // Customize these variables
    this.color = "7ba9a3";
    this.colorLight = "a2dfd7";
    this.colorBottom1 = "6d938e";
    this.colorBottom2 = "51706c";
}
```
In your css change the box background:
```css
#nameContainer {
    /* Customize these colors*/
    background: radial-gradient(#7ba9a3, #6A928C);
}
```

##Settings

To build your box, create a grid that fits to the container width and defined by:
* the number of columns
* the number of elements where height and width are equal

| Attribute | Value Type  | Description |
| :--- | :---: | :--- |
| `data-nb-elements` | int | Integer that defines the number of elements in the box. |
| `data-nb-column` | int | Integer that defines the number of columns in the box.. |
| `data-border-vertical` | int | Integer that defines the height of the top and bottom edge of the box. |
| `data-border-horizontal` | int | Integer that defines the height of the top and bottom edge of the box. |