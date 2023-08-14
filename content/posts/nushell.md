---
title: Why Nushell is great
date: 2023-08-14
image: nushell_crop.png
tags:
  - Linux
  - Nushell
---


It's been a while since I got excited about shells.
I experimented with [Zsh](https://www.zsh.org/) and [Fish](https://fishshell.com/) in the past, but always reverted to Bash.
I think these shell alternatives don't provide enough features for me to set them up, as I go from one system to the next.

Recently, I came across the [Nushell project](https://www.nushell.sh/), and it really is a joy to use.
Nushell is a contemporary, Rust-based shell interpreter.
It borrows concepts from a lot of places, including PowerShell, TypeScript, and functional programming.
But I think what makes it better than the other shell alternatives is one key realization: **it's all tables and dicts**.

# The problem

In the Bash ecosystem, data manipulation is split between the command itself and utilities. 
Source commands like `ls` and `top` provide text data, which is either processed in-place or through a utility like `grep`, `awk` or `sort`. 

For example, say you want to sort data inside your shell.
`ls` gives you the `-S` flag to sort files by size.
If you are using `du`, this [Stack Overflow
thread](https://superuser.com/questions/368784/how-can-i-sort-all-files-by-size-in-a-directory)
suggests `du -ha | sort -h` to do the same thing. 
The story is the same for list of processes.
With `ps`, you can sort the table using the `ps --sort` flag, but you need to learn a specialized vocabulary to select the columns to sort by.

With three basic commands, we learned three ways to sort by a column.
This kind of complexity is why I reach for Google very often when I write a command, even with 15 years of experience using Linux.
It's why people are developing very elaborate terminal emulators to translate natural language into Bash commands.

# The solution

Once someone finally realizes that most of these utilities deal with tables and dicts, there are improvements to be made. 
A single, generic set of data manipulation utilities can be developed.
These primitives are Nushell's `sort-by`, `get`, etc. 
Here is how Nushell lets you sort data by a column:
```
ls | sort-by size
```
Notice how `ls` isn't involved in the sorting.

Through a software development lens, we could say that the contract between the program and the shell has changed. 
The source programs must now produce structured data.
It can be any one of Nushell's supported formats, including csv, json, [Parquet](https://parquet.apache.org/)...
In return, CLIs don't have to provide data display and manipulation logic.
The responsibilities between the different programs are better defined, and it reduces the complexity of the toolkit as a whole. 

There are many more subjects I would like to touch on about Nushell.
I would like to study how quickly it can be made compatible with arbitrary tools.
The [SLURM](https://slurm.schedmd.com/documentation.html) CLI is a tool I interact with daily that produces a lot of tables and dicts.
How easily can I manipulate them using Nushells utilities?
I think this kind of compatibility is key to making Nushell stick inside my toolbox.
