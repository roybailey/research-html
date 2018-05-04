# CSS notes

* Certain properties are inherited, including those for text, lists, and table borders
* Don’t confuse initial and auto values.
* Stay out of TRouBLe with shorthand properties

REM = root em, so size relative to 'root' or 'html' size (default font size usually 16px)

* rems for font sizes
* pixels for borders
* ems for most other measures, especially paddings, margins, and border radius (percentages for widths when necessary)
* Use unitless values when specifying line height
* Use custom properties to avoid repeating values, and allow for easy override of those values

Viewport 

* vh = 1/100th of the viewport height
* vw = 1/100th of the viewport width
* vmin = 1/100th of the smaller dimension, height or width (IE9 supports vm instead of vmin)
* vmax = 1/100th of the larger dimension, height or width (not supported in IE or, at the time of writing, Edge)

e.g. scaling font based on both em and viewport size

```
:root {
  font-size: calc(0.5em + 1vw);
}
```


### supports/media

* `@supports (display: grid) or (display: -ms-grid)` process content if grid or older MS Edge grid supported
* `@supports not (display: grid) { ... }` process content is grid is not supported 
* `@media (min-width: 20em) and (max-width: 35em) { ... }` use ems for media breakpoints, consistent across browsers
* use `display: none` to remove unwanted parts for printing

```
@media print { *{
    color: black !important;
    background: none !important;
  }
}
```

* Response Patterns https://bradfrost.github.io/this-is-responsive/patterns.html
* Creating compact small images https://tinypng.com/
* `<img src.../>` for legacy browsers and `<img src... srcset.../>` for multiple images different sizes

```
<img alt="A white coffee mug on a bed of coffee beans"
     src="coffee-beans-small.jpg"
     srcset="coffee-beans-small.jpg 560w,
             coffee-beans-medium.jpg 800w,
             coffee-beans.jpg 1280w"
     />
```
* Always build your designs mobile first.
* Use media queries to progressively enhance the page at larger and larger viewports.
* Use fluid layouts that fit the screen at any browser size.
* Use responsive images to fit the bandwidth limitation of mobile devices.
* Don’t forget to include your meta viewport tag.

### CSS variables

* defined with -- prefix, used with var(variable, default if variable undefined) function

```
:root {
    --main-font: Helvetica, Arial, sans-serif;
    --brand-color: blue;
}
p {
    font-family: var(--main-font);
    color: var(--undefined-color-variable, blue);
}
```

### Selectors

* `li > a` defines direct decendent (of link item to contained anchor)
* `.login-form input:not([type=checkbox]):not([type=radio])` combined the `:not()` pseudo-class with the attribute selectors `[type=check- box]` and `[type=radio]`. This targets all input elements except checkboxes and radio buttons.

### Layout

* `box-sizing: content-box;` (default) means only content is covered by width*height
* `box-sizing: border-box;` means border and padding and content are covered by width*height
* `display: block;` to ensure the height contributed to parent is derived from padding and content (not just line-height)

Apply border-box to all elements and pseudo elements, but use inherit to allow for 3rd party layouts that border-box might break.

```
:root {
    box-sizing: border-box;
}

*, ::befire, ::after {
    box-sizing: inherit;
}

.third-party-container {
    box-sizing: content-box;
}
```

Use `calc` to remove margin from border-box

```
    width: calc(30% - 1.5em);
    margin-left: 1.5em;
```

### Margins

* negative left and top margins pulls the element in that direction, overlapping preceeding elements
* negative right and bottom margins pulls succeeding elements over this element
* top and bottom margins collapse into largest of the two (but not for left and right margins)
* use the + to specify only second peer elements onwards e.g. `.class + .class`
* lobotomized owl selector `body * + * { margin-top: 1.5em }` selects any second peer elements onwards

### Floats

* pseudo-elements start with double colons (`::`)
* `::before` and `::after` are used to insert elements into the dom before or after an element

### FlexBox

* `flex-direction` This specifies the direction of the main axis. The cross axis will be perpendicular to the main axis.
* `flex-wrap` This specifies whether flex items will wrap on to a new row inside the flex container (or on to a new column if flex-direction is column or column-reverse).
* `flex-flow` shorthand for `flex-direction` `flex-wrap`
* `justify-content` Controls how items are positioned along the main axis.
  * `flex-start` from start to end along axis
  * `flex-end` from end to start along axis
  * `center` centered on axis (extra spacing at start and end)
  * `space-between` extra spacing between items (none at start and end)
  * `space-around` extra spacing around items (equal at start and end as inbetween)

### Grid

* `fr` unit for fraction units (i.e. 1fr 1fr 2fr produces 25% 25% 50%)
* `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));` minmax allows for minimum and maximum (expanding) sizing
* `auto-fill` will fit as many on track as possible within minmax() constraint (i.e. without sizing < minimum)
* `auto-fit` same as `auto-fill` but will stretch row when insufficient to fill the cells





