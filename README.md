# Alpine.js plugin Screen

The **Screen Plugin** lets you programmatically monitor changes to the size of an element.

## Instalation
### Via script include
```html
<script src="/js/screen.min.js" defer></script>
<script src="/js/alpine.js" defer></script>
```

### Via CDN
```html
<!-- Alpine Plugins -->
<script src="https://unpkg.com/@victoryoalli/alpinejs-screen@1.0.0/dist/screen.min.js" defer></script>
<!-- Alpine Core -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Via NPM

```javascript
import Alpine from 'alpinejs'

import screen from '@victoryoalli/alpinejs-screen'
Alpine.plugin(screen)

window.Alpine = Alpine
window.Alpine.start()
```

# x-screen
Directive
```html
    <div x-data x-screen="alert('screen resized')"></div>
```


# $width and $height
Magic helpers
```html
<div x-data x-screen="isBig = $width>1024">
    Bigger than 1024 pixels
</div>
```

### Example

Using $width magic helper

```html
<html>
    <script src="/js/screen.min.js" defer></script>
    <script src="/js/alpine.js" defer></script>
    <div x-screen="isMobile = ($width<1024)">
        <span x-show="isMobile"> MOBILE </span>
    </div>
</html>
```
