# Filter Helper for Vinted Bookmarklet

_Add better pertinance filter on a Vinted search._

## Motivation

Mid-2019, [Vinted](https://www.vinted.fr/) allowed to filter the search results by distance.
This very useful feature was removed. However, vendors's locations are still an available information.
The aim of this bookmarklet is to re-enable the distance filtering.

## ToDo

Current buyer location is hardcoded > to change.
Improve the bookmarklet to only execute it once.

## Usage

### Browser bookmarklet

1. Copy the contents of `index.js`
2. Paste into the URL field of a browser bookmark :
   - prepend the text with `javascript: (function() {`
   - append the text with `})();`
3. Navigate to a Vinted page already filtered in that browser (by size for example)
4. Execute the bookmarklet once to order by distance
5. Execute the bookmarklet a second time if you want to display the vendor city
6. Repeat each time you reload Vinted
