<img src="chromatography_logo.png">

Color is widely used in data visualization to show data values. The proper selection of colors is critical to convey information correctly. Usually, the main application for color in data visualization is to encode data. However, the creative use of color is also used either for aesthetic reasons or to highlight certain facets.

It would be great to easily map scalar values to a chosen color. This could be done by either using a continuous function, or, through a discrete mapping. The ordered set of colors that results is commonly called a palette. The proper selection of colors in just the right combination is essential for the optimal display of visual information.

So what does this JS library do? It helps you deal with colors. Create color scales. Simply get color variations. Get a bunch of nicely contrasting colors based on a few understandable input parameters. Determine whether the contrast ratio between colors is adequate for readability. Receive color values back in whichever form best suits your needs (e.g., RGB, hexadecimal, etc.). The hope is that very nice color palettes can be easily and routinely applied to data visualization graphics across a variety of media.

### Examples

#### Transform Color Values Between Formats

Let's transform some color values between formats. Usually, I'm trying to get a hexadecimal color value. Going from RGB to hex:

```js
chromato.rgb(230, 0, 0); // returns "#E60000"
```

HSL to hex:

```js
chromato.hsl(0.5, 1, 0.5); // returns "#FF0200"
```

HSV to hex:

```js
chromato.hsv(0.3, 1, 1); // returns "#FF0100"
```

#### Interpolate Between Two Color Values

You can interpolate across two colors, using the `chromato.interpolate` function. Here is an interpolation halfway between two colors (provided in the hexadecimal format) in the HSL color mode:

```js
chromato.interpolate('#C64C66', '#6B71D9', 0.5, 'hsl'); // returns "#C05BD0"
```

Might as well do it in RGB:
```js
chromato.interpolate('#C64C66', '#6B71D9', 0.5, 'rgb'); // returns "#985E9F"
```

#### Generate a Randomized Set of Colors Based on HCL Parameter Ranges

Define a number of distinct colors using ranges of hue, chroma, and lightness:

```js
var colors = createPalette.generate(
                12, function(color){ var hcl = color.hcl();
                return hcl[0]>= 0 && hcl[0]<= 360 && hcl[1]>=0 && hcl[1]<=3.0 && hcl[2]>=0.75 &&hcl[2]<=1.5 ;
                }, false, 30);
var colors = createPalette.diffSort(colors);
colors;
```

