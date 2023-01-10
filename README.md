Project title
### American Graffiti

by
### Bjorn Johansson

#

### About

<!-- *Editing for clarity might be needed.* -->

The overarching idea for this project (as well as few of my previous ones) was to create a visually pleasing 'kinetic pattern'.

A pattern that's always changing, but at the same time always looks more or less the same.

The inspiration for this concept comes from looking at the ocean, or an open fire, or maybe the crown of a tree rustling in the wind. Constant movement w/o any specific focal point that is very pleasing and almost hypnotizing to look at. Inducing a similar feeling in the viewer is what I'm trying/hoping to achieve. (Someone once told me there's a philosophical(?) term for this concept, but I can't remember what it is atm)

The beauty and ingenuity of typography in general is also a topic of endless fascination to me.


### More specific inspiration

Robert Indiana's 'Love' scultpture(s) is an important piece of inspiration for this project.
It's the reason I decided to learn three.js. So I could work with the typographic characters as 3D objects rather than 2D shapes as I've always done in the past.

The versatility of the word Fuck has always been fascinating to me (I'm born and raised in Sweden where there's no equivalent word).
So many things/feelings/opinions can be succinctly expressed with it. And a lot of times they are expressed in writing on the walls of bathroom stalls in schools, bars, rest stops etc. And that's what the title is referring to.

The Fuck statements are not supposed to be seen as expressed by me, rather they're intended to represents things other people can agree or disagree with.
(But of course, the work is done by me and I don't want to express offensive opinions that I don't share, so in that sense they are from me anyway)

On rare occasions a statement starts with the word Love instead of Fuck as a kind of acknowledgement of where some of the inspiration came from.


### My friend Cooper Black

Cooper Black with it's beautiful, soft, pillowy shapes has always felt like a very friendly typeface to me. Anything written with it appears as if it's coming from a friend who's opinions are always worth listening to.
Which in this case has the effect of making these rather crude and possibly offensive statements appear much less so.

The rounded shapes also help in making the animations even more soothing to look at.


### How it works

I originally tried making this work in 2D (before I learned three.js) but quickly realized that skewing vector shapes to fake 3D wouldn't suffice.

But I also knew it had to appear as 2D, because I wanted it to be able to stretch over different sized (digital) canvases.

The solution was to create the text in 3D, extrude the shapes, and use an orthographic camera together with materials w/o shading.

By adjusting the rendering order the flat character faces always appear in front of the extruded character bodies, even though they're not always in front in the 3D scene.

This allows me to animate the faces in front of the bodies, which creates the illusion that the characters are constantly changing the direction they're facing. (Does that make sense?)

I'd like to think that this illusion can be considered as part of Gestalt Theory (maybe under the figure/ground rule?), but I could be wrong about that.


### Click canvas to change angle

I like to imagine this work being displayed on interactive displays that anyone can walk up to and tap on to change the angle. I'm not sure if art specific touch screens are available just yet, but if they're not, I'm sure they will be in the not too distant future.

Whether or not NFTs can be interactive on the various marketplaces that exist is also something I don't really know. But I surely hope so.


### The End
