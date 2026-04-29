---
title: Leaving Setapp—23 Alternatives & 3 Holdouts
date: 2026-04-20
slug: leaving-setapp
---

I’ve been using Setapp for nearly a decade, almost as long as it has existed. 
At the time, I was doing freelance work, and having access to a growing collection of tools for a set monthly fee was revelatory. 
I’ll admit, there’s also the allure of having shiny new apps to try out whenever I want. 
Over the years, its library expanded, and the subscription became even more worthwhile. 
I even talked an employer into subscribing so I could use it at work.

Eventually, I settled into a pretty stable collection of tools, and I got to wondering if it was still worth it. 
A few years ago, as the annual subscription renewal approached, I started looking for apps to replace what Setapp offered that I still relied on. 
I always ended up concluding that it was still worthwhile. Until this year.

It wasn’t easy; a few apps are too specific to have viable replacements, and some really great alternatives are obscure. 
If you’re a Mac user looking to move away from Setapp, maybe the list I spent years assembling will help you. 

Below is the list of apps I was using, what I’ve found to replace each, and a few I just couldn't part with. 
I'm including a link for each app, as well as the Homebrew command if one is available (Homebrew deserves another article entirely, if you know you know). 

## Worth Simply Buying

To kick things off, three of the Setapp apps I used regularly were just so good, or so one-of-a-kind, that I went ahead and bought them.

### [Antinote](https://antinote.io/)—$5

Fantastic little notepad that lives in your menu bar. As a bonus, it handles basic math—like keeping running totals—so it replaced Numi for me as well.

```
brew install --cask antinote
```

### [Popclip](https://www.popclip.app/)—$12

There is nothing else quite like PopClip. The price is a steal for how much genuine utility I get from it.

```
brew install --cask popclip
```

### [Typeface](https://typefaceapp.com/)—$43

This is by far the most expensive app on this list, but I simply can’t find anything better. Fontbase comes closest, and its base version is free, but it doesn’t really compare. If you do a lot of work with fonts, it’s worth it.

```
brew install --cask typeface
```

## AlDente Pro = [Stasis](https://github.com/srimanachanta/Stasis)—Free (open source)

One of my favorite AlDente Pro features is the power distribution graphic. 
It not only looks kind of futuristic; it also gives real information about how much power your Mac is drawing and where it’s going. 
I like that a lot.

I tested a number of apps that worked fine, but **Stasis** is the only one I found that was both free and included a distribution graph. 
The graph is turned off by default, but it can be turned on in Settings > Dashboard > Visuals, labeled “Power distribution diagram.”

```
brew install --cask srimanachanta/tap/stasis
```

## Archiver = [Keka](https://www.keka.io/en/)—Free, $6

I only recently discovered **Keka**, but already, I’m impressed. 
It has all the options you could want in a minimal package. 
You can get it on the Mac App Store, but it will cost $6 (one time). 
Download it directly or use Homebrew, and you can use it for free.

```
brew install --cask keka
```

## Bartender = [iBar Pro](https://apps.apple.com/us/app/ibar-pro-menubar-control-tool/id6737150304)—$10

Even before deciding to cancel Setapp, I was looking for a replacement for Bartender. 
Beyond some valid privacy concerns with its new owners, updates have stalled. 
It still isn’t entirely compatible with Tahoe; when it wasn’t crashing, icons would shift around randomly and sometimes just disappear. 

The standard recommendations—**Ice**, **Vanilla**, **Dozer**, and **Hidden Bar**, specifically—work well, but are missing one vital feature: 
They can’t display hidden icons on a floating bar below the standard menu bar. 
Well, Ice has that feature, but it crashed every time I tried to enable it. 
If you don’t need that feature, all four are worth checking out.

I was about to give up when I found **iBar Pro**. 
It just works. 
It has all the features I care about, and so far has been rock-solid. 
The one-time price is worth it, in my opinion.

## BetterTouchTool = [Middle](https://middleclick.app/) & [Rectangle](https://rectangleapp.com/)—$8 & Free (open source)

My choices cover only the features I was using. 
I used BTT to enable “middle click” on my MBP’s trackpad, and for window snapping. 
BetterTouchTool has a massive number of features; these don’t begin to cover them all.

**Middle** is a very simple app that does one thing: 
Enable middle-click on a trackpad or Magic Mouse with a few options for triggering, and that’s it. 
Perfect.

```
brew install --cask middle
```

**Rectangle** is a powerful and free window-snapping utility with all the expected options. 
Many similar utilities exist, but Rectangle comes highly recommended, and so far, I’m happy with it.

```
brew install --cask rectangle
```

## CleanMyMac = [Mole](https://github.com/tw93/Mole) & [Pear Cleaner](https://itsalin.com/appInfo/?id=pearcleaner)—Free (open source)

CleanMyMac has long been one of the first apps I install on a new machine. 
The problem is, without Setapp, CleanMyMac would cost $16 a month or nearly $200 one-time (for the Pro version with all the features). 
This app alone kept me on Setapp long after I’d started to doubt its continued value. 
I was ready to give up again when I found **Mole**.

**Mole** is a command-line (CLI) tool for keeping your Mac running smoothly. 
It requires basic comfort in the Terminal and offers few options, but in my experience, it works very well. 
I created a simple shell script so I can launch it like any other app.

```
brew install mole
```

**Mole** will cleanly uninstall apps, but **Pear Cleaner** does it better and more easily. 
Just as you can with CleanMyMac, **Pear Cleaner** can be set to open automatically when an app is moved into the Trash. 
I find it does an even better job of cleaning up stray files than CleanMyMac, and offers far more options and transparency.

```
brew install --cask pearcleaner
```

## CleanShot X & TextSniper = [Shottr](https://shottr.cc/)—Free version, $12 Basic

**Shottr** is remarkably similar to CleanShot X in terms of features and capabilities. 
The biggest gap in **Shottr’s** arsenal is video screen recording. 
In **Shottr’s** win column is optical character recognition (OCR), meaning it can replace TextSniper as well. 

I’ve been using the free version with no problems. 
If you plan to use it commercially, a Basic license is required, and the creator has said there will likely be future features added only to the Basic version.

```
brew install --cask shottr
```

## CodeRunner = [CotEditor](https://coteditor.com/)—Free (open source)

Honestly, most of CodeRunner’s features were wasted on me. 
I’m not a coder, but I do dabble in writing and editing scripts and various markup languages, and CodeRunner was a convenient tool to have in my utility belt. 

**CotEditor** is everything I actually need in a far more attractive and user-friendly package. 
It deftly manages helpful features such as syntax highlighting, bracket indicators, and hidden characters. 
If it weren’t for the live preview formatting in Typora, I’d probably use **CotEditor** as a Markdown text editor as well.

```
brew install --cask coteditor
```

## Dropzone = [boringNotch](https://boringnotch.com/)—Free

**boringNotch** is both more and less than a replacement for Dropzone. 
It includes a file shelf that hides in the screen notch when not in use, and works just as well as any I’ve used. 
It also contains media controls and a calendar. 

What it doesn’t have is Dropzone’s ability to add apps and functions to drop files onto. 
I solved that by simply adding those apps to my Dock, though I still wish I could find a real replacement for that feature.

## Gemini 2 = [DupeGuru](https://dupeguru.voltaicideas.net/)—Free (open source)

**DupeGuru** is a powerful and flexible duplicate file finder wrapped in a spartan interface. 
It’s fast and works well, but it doesn’t hold your hand or offer many automatic features. 
Be cautious!

## Luminar Neo = [Affinity](https://www.affinity.studio/) or [Pixelmator Pro](https://apps.apple.com/us/app/pixelmator-pro-edit-images/id6746662575?platform=mac)—Free

Seriously, just go get both **Affinity** and **Pixelmator Pro**. 
They both have free versions, and they’re both amazing. 

**Pixelmator Pro** is a closer match for Luminar Neo, and I actually prefer it. 
If nothing else, the “Super Resolution” feature is pretty killer. 

And **Affinity** is like 80% of Photoshop, Illustrator, and InDesign for 0% of the cost. 
I’ve been using it since it was three apps for $50 each, and I’ve never regretted buying it.

```
brew install --cask affinity
```

## NitroPDF Pro = [PDFGear](https://www.pdfgear.com/pdfgear-for-mac/)—Free

NitroPDF Pro is a genuinely good, user-friendly PDF editor—a hard act to follow. 
**PDFGear** is the closest replacement I’ve found so far. 
It does everything just fine, but it lacks some of the polish I’ve gotten used to. 
If anyone has suggestions, please send them in!

## One Switch = [Only Switch](https://github.com/jacklandrin/OnlySwitch)—Free (open source)

Only Switch is pretty much a clone of One Switch. 
I haven’t noticed any tradeoff or functional difference from switching.

```
brew install --cask only-switch
```

## Paste = [Maccy](https://maccy.org/)—Free (Open Source)

Maccy doesn’t offer syncing like Paste, but it’s reliable, lightweight, and it just works. 
You can also use the clipboard managers built into Spotlight (as of Tahoe) or Raycast, but I like the simplicity of a button that opens a list to pick from.

```
brew install --cask maccy
```

## PDF Squeezer = [Clop](https://lowtechguys.com/clop/)—Free version, $15 Pro

Clop is a simple, shockingly fast compression app that handles PDFs and many image and video formats. 
Just drop the files on the icon, or an optional automatic drop zone or watched folder, and it does its thing. 
In my testing, it compresses as well as PDF Squeezer and actually works faster. 
That it handles other files as well is a nice bonus.

```
brew install --cask clop
```

## Renamer = [NameChanger](https://mrrsoftware.com/namechanger/)—Free

Batch renaming of files saves so much time that even if I don’t use it often, I always like to have a renamer app on hand. 
**NameChanger’s** UI isn’t quite as clean as Renamer’s, but it works just as well.

```
brew install --cask namechanger
```

## Rocket Typist = [Espanso](https://espanso.org/)—Free (open source)

Before Rocket Typist, I used TextExpander for years. 
The flexibility of a dedicated text expander app makes it far superior to macOS’s built-in text replacement utility. 
**Espanso** isn’t a full replacement for Rocket Typist for a few reasons. 
First, there’s no iOS support. 
Second, you have to edit YML files to change or add expansions. 
And finally, it lacks some of the more advanced options like pop-up windows for filling in blanks. 
The tradeoff is that it’s lightning-fast and light on resources. 
And free.

```
brew install --cask espanso
```

## Sip = [Color Picker](https://sindresorhus.com/system-color-picker) OR [Pika](https://superhighfives.com/pika)—Free (open source)

I’ve been a designer for a long time, and I’ve been colorblind for even longer. 
That means I rely on color pickers more than most to double-check my work. 
Sip is genuinely well-designed and user friendly. 
In all honesty, neither of my suggestions is quite as nice—but both are great as free replacements.

**Color Picker** is one of many useful little utilities made by [Sindre Sorhus](https://sindresorhus.com/). 
It puts the macOS system color picker in the menu bar and adds some useful features to support use by devs and designers.

**Pika** is interesting in that it allows you to pick two colors and view them next to each other. 
It doesn’t have some of the niceties of other options, but it’s free, and being able to compare colors side by side in the window is surprisingly useful.

```
brew install --cask pika
```

## Step Two = [Ente Auth](https://ente.com/auth/)—Free (open source)

Step Two is one of the most user-friendly authenticator apps I’ve ever used. 
And so is **Ente Auth**, with the advantage of being open source. 
I haven’t tried Ente’s commercial offerings—Ente Photos (a private cloud photo album) and Ente Locker (like Dropbox, but end-to-end encrypted)—but the polish and utility of Ente Auth is fantastic.

```
brew install --cask ente-auth
```

## [Raycast](https://www.raycast.com/)—Free, $8/mo Pro

I had to include an honorable mention for Raycast, which is a lot like Spotlight, except that it's extensible.
It has window and clipboard management built in, and offers plugins for darn near anything you can think of. 
I find it a bit fiddly—I always struggle to remember the right commands or shortcut keys—but many people swear by it. 
The free tier is enough for most.

```
brew install --cask raycast
```

---

And that's my list.
If you're not keeping track, that's 26 app recommendations—23 replacements and 3 holdouts—for a grand total of $78 (I decided the free tier was enough in a few cases, as noted).
That's less than the price of one year of Setapp.

Did I miss any better options?
If so, please let me know.
I'm always on the lookout for better tools.

Finally, most of these apps are free, but if you find them useful, consider donating or upgrading.
A lot of people put a lot of time and effort into making some really fantastic tools; they deserve our support.
