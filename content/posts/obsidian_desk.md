---
post_title: A Desk for Obsidian
post_date: 2023-08-26
image: desk_crop.png
keywords:
  - Knowledge Management
  - Obsidian
  - UX
post_summary: |
  Desk is an extension for the Obsidian note-taking software. It improves on Obsidian's
  default behavior by giving a more prominent place to the search results in the
  visual hierarchy. Desk makes it easier to use backlinks and get a birds eye view
  of your notes for a particular topic.
---

<p class="post-topics">topics: Knowledge Management, Obsidian, UX</p>

**I just published a plugin for [Obsidian](https://www.obsidian.md) called
[Desk](https://github.com/davidlandry93/obsidian-desk). Here, I want to explain the
rationale behind it, and why I think it's a useful addition to almost any vault.**

In the space of Personal Knowledge Management (PKM), Obsidian is my tool of choice. It's
a note-making software that supports all the current best practices in PKM, like
text-based storage, backlinks, etc. Obsidian has a very user-centric development
philosophy. Despite it not being open-source, I use it extensively for my research.

So, what is it that I wanted to change about Obsidian? It has to do with the way
information is presented. More specifically, the search results in Obsidian are always
presented in a small and secondary manner (in terms of [visual
hierarchy](https://en.wikipedia.org/wiki/Visual_hierarchy)). I feel like search should
have a very prominent place in a note-making software.

I use two ways to search for information in Obsidian: the search dialog, and backlinks.
The search dialog is self-explanatory. Backlinks are like a keyword search. If I go to
my `Knowledge Management` note, I get to see all the other notes where I made a link to
that page.  Here's a screenshot where we see both of these search tools in action.

![How search results are displayed in a default Obsidian configuration.](/images/obsidian_small_search.png)

Notice how the search results and the backlinks are displayed off-center and have
smaller font. That's after I've enabled the option to show the backlinks below the note.
By default, Obsidian shows the backlinks in the right column, similarly to what you
see on the left column. That gives backlinks even less visual importance.

What if I want to browse my notes on a topic, and see them at a glance? There's no
comfortable way to do this in my opinion. My extension, Desk, changes this. Here's a
screenshot to give you the idea.

![How search results are displayed in the Desk extension for Obsidian.](/images/obsidian_desk_screenshot.png)

It displays search results prominently. It shows multiple notes at once, which is useful
when you want to explore a topic with a birds-eye view. The notes are presented in a 4x6
aspect ratio, which mimics the flash cards you would use in an analog Zettelkasten
system. I'm pretty happy with it, because it solves what was bugging me about search in
Obsidian. I hope it brings you joy too!

The extension is currently under review, and should be available soon in the Community
Plugins section of Obsidian. You can also
[download](https://github.com/davidlandry93/obsidian-desk/releases) it directly from my
repo and give it a go now.
