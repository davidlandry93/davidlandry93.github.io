---
post_title: Combining Lisp and Markdown for document editing
date: 2024-10-06
templateEngineOverride: njk,md
image: "images/layout.jpeg"
---


An important part of my job as a PhD researcher is to communicate complex ideas. Typical projects culminate into a paper, but along the way I also have design slideshows and posters. I use a different tool for all these tasks, but I can't help seeing similarities. Aren't they all about expressing layouts, kind of like I do in HTML?

Of course as a computer nerd I want to express these layouts in a textual format like Markdown. Text is good because it is compact, much less dependent on the software that makes it, and versionable. But the most important to me is the precision of text. In CSS, I can state the font spacing once and have the change be spread everywhere. In theory, Google Slides can do that too with proper theming, but in practice I always end up tweaking layouts for ages.

I want to explore a design space where the language is more flexible and powerful than Markdown, but preserves as much raw text legibility as possible. Here are the applications I have in mind:
- Building slideshows using text, like in Beamer, Marp or Reveal.js
- Building scientific posters
- Maybe writing longer documents
- Embedding rich layouts in Markdown note-taking software like Obsidian. 
The key idea is to allow users to enrich Markdown documents with their own constructs (definition lists, function documentation, a slide etc). These capabilities are offered by LaTeX or Typst, but it has to be done in domain-specific languages. What if we could target the well-known HTML instead? 

To do so I'm thinking of ways to blend Lisp and Markdown to build static HTML structures. In the rest of this post, I sketch how such a combination could work. Why target HTML? Web browsers have powerful rendering engines that have been developed over decades. They can express just about any layout and the amount of material available to learn about HTML and CSS is fairly large. I think this makes it a good target language for these tasks.
## Combining Lisp with Markdown
It may seem surprising to see Lisp used in an application where readability is important. Lisp dialects are less readable than other programming languages because they provoke lots of consecutive parentheses. However, I still believe they are a good option for this use case. Used in a functional style, they can be used to build complex layout trees from function calls. This is done by combining Scribble's @-syntax with Clojure's Hiccup markup convention.
### Scribble's @-syntax
The first important ingredient for integration is [Scribble's @-syntax](https://docs.racket-lang.org/scribble/reader.html) . Scribble is a documentation software suite by the Racket community. It makes the key proposition to map markup annotations to Lisp calls. The solution is actually quite elegant:
```racket
@tag[:keyword value]{
	Body text. 
}
```
maps to the more familiar
```clojure
(tag :keyword value "Body text.")
```
In the @-syntax, the `[]` part maps to usual Lisp symbols, where the `{}` part is interpreted as raw text and is passed as the last argument to the list. This allows Scribble to build layouts by making Lisp calls as in:
```racket
@title{Bonjour-hi}

Lorem ipsum.

@centered{
	@bold{Cookies wanted.}
}
```
This allows a seamless transition from the markup syntax to the actual programming language. They even used it to encompass LaTeX templates that are common for publication in their community. I think this is genius, because they get LaTeX's good typesetting but with a more expressive (and I assume more debuggable) syntax.
### Clojure's Hiccup
The @-syntax solves only part of the problem, however. Scribble has to redefine and document a lot of constructs that already exist in HTML (e.g. paragraphs, item lists, tables). If we know we are going to target it, we can write HTML directly instead of going through an intermediate representation. It is sometimes cumbersome to produce HTML strings programatically. Fortunately, that problem was already solved by the Clojure community through [Hiccup](https://github.com/weavejester/hiccup). The idea is to agree on how to build a Clojure `vec` such that we can compile it to HTML:
```clojure
(defun MyHTML []
	[:div.className 
		[:h1#headingID "Bonjour-Hi"]
		[:p
			[:a {:href "#headingID"} "Link to title"]]])
```
Hiccup makes it less difficult to close a tag than HTML. Importantly, the HTML tree structure is expressed in valid Lisp code (and the compiled later). A function call is used later to compile this tree to a string. Complex trees can be built by mingling Clojure logic with Hiccup tags. 
### Putting it together
A full solution could look like this:
```lisp
!(defun Comment [comment body]
	[:mark {:style "background-color: \"yellow\""} body])

# Document title

This is a *sentence* that @Comment["I disagree"]{is being discussed upon}.
```
Here, we have extended Markdown with a new construct without creating a new Markdown dialect. If someone believed in comment-able Markdown, they could build a few templates and that improve rendering support  for the inside an existing toolchain.

The slideshow use case could look like this
```racket
!(defun TitleSlide [title]
	(SlideBase 
		[:div.center 
			[:h1
				[:b title]]]))

@TitleSlide{My Title!}

@SlideBase{Another slide.}
```
Here we made a presentation that compiles to HTML. The user was able to extend it with a new slide layout instead of modifying the compiler software to support the new slide type. The extension was done using a general programming language rather than a domain-specific one (LaTeX, Typst). The user did not have to inline full raw html inside his Markdown document.
## Potential applications
I would love to have the tool outlined above for scientific editing tasks, making presentations, posters and long-form documents. 

Using a Markdown-Lisp blend to build a presentation would be nice because Markdown can be extended systematically instead of adding many small ad hoc changes. For instance, [Marp](https://marp.app/) overloads the `---` of Markdown to delineate slides. A Markdown-Lisp toolchain similar to Scribble does not need a new compiler or Markdown dialect for this, only a function. When building presentations from text, existing tools  (Marp, Reveal.js) sometimes have trouble expressing layout instructions (centering, columns) without using full HTML code. The blend proposed above has all the expressive power of HTML and CSS, using Hiccup's elegant syntax.

I think the discussion above also applies for posters. I currently use [Inkscape](https://inkscape.org/) to make posters, but I'm frustrated by its limited text flow capabilities. I tend to spend a lot of time resizing elements and text boxes. I'm seriously considering writing my next poster in HTML. That text could flow from one column to the next and I could define widths programatically. Or better yet, I could write it in a Lisp-Markdown blend as proposed above.

For long-form documents, the use case is less clear, but still worth thinking about. Typst is a great software and its fast compile times are game-changing. I notice Typst uses a syntax that is very similar to the @-syntax described above. However I find programming in it a bit tedious. I would rather learn Racket or another fully-fledged Lisp than to code complicated Typst constructs. Also, I think its rendering is not quite at LaTeX level yet. Scribble already shows us that we can use the @-syntax to define the document and then compile to LaTeX. Maybe this is still the way to go, but I have to admit that I would miss the fast compile times.

The last use case I have in mind is my [Obsidian](https://obsidian.md/) vault. A lot of extensions exist to provide rich rendering for notes. For instance, my contact notes could have a uniform front-matter with informations such as email and phone number. It makes sense to build a nice contact card layout to display those. If Obsidian had an embedded interpreter for a Lisp-Markdown blend, then maybe some of that rich rendering could be done in place. No extension required.
## Conclusion
I believe the key ideas of
1. Mapping markup constructs to Lisp calls using something like Scribble's @-syntax
2. Building HTML documents using something like Hiccup's syntax

can be combined to express rich layouts in a systematic, readable and extensible way. Such a toolkit could make it easier to design rich documents for scientific tasks, and potentially reduce the need to *something-to-HTML* compilers.

I'm aware that designing the syntax is only a minor part of such a redaction system.  The real work is in building tools that use this syntax to produce actual documents.
I'm interested enough in this idea to play around with a prototype, but maybe I should actually learn Racket and Scribble in the meantime. Stay tuned!