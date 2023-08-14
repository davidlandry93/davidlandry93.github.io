---
title: Why Nushell is great
date: 2023-08-14
image: nushell_crop.png
tags:
  - Linux
---


It's been a while since I got exciting about shells before. I have experimented with
[[Zsh]], [[Fish]] in the past, but always reverted to [[Bash]] by lack of interest. I
think [[Nushell]] is different, because it makes one key realization: its all tables and
dicts. 

In the Bash ecosystem, the responsibilities for filtering and manipulating the data are
split between the command itself and utilities such as [[grep]] or [[awk]] or `sort`.
For instance, `ls` gives you the `-S` option to sort files by size. If you are using
`du` instead of `ls`, this [stackoverflow
thread](https://superuser.com/questions/368784/how-can-i-sort-all-files-by-size-in-a-directory)
suggests the odd `du -ha | sort -h`. Here the same responsibilities are this time split
between two programs. If you are dealing with a list of processes, maybe you are using
`ps`. This time, you can sort the table using the `ps --sort` flag, as  well as a
specialized vocabulary to select which column to sort by. Same operation, three
different syntaxes. This kind of incongruity is why I reach for google every time I want
to write a command, even with 15 years of experience using linux.

Once someone finally realizes that most of these utilities deal with tables and dicts,
there are massive improvements to be made. We can create a generic set of structured
data manipulation primitives, and simply pipe our structured data through it. These
primitives are Nushell's `sort-by`, `get`, etc. I think of them as a universal set of
flags that you can use on all commands, instead of having one set of flags per command.
Through a software development lens, we could say that the contract between the programs
in my shell has changed. The source programs must produce structured data instead of
text. In return, they don't have to provide as much manipulation and filtering logic.
The responsibilities between the different programs are better defined, and it reduces
the overall complexity of the toolset. 

# Retrocompatibility

Another reason I think Nushell is great is that it has good compatibility with existing
command line utilities. If the output can be parsed, . 

The best example I can think of is `squeue`. It is a command line utility provided by
the [[SLURM]] scheduler to . The documentation for that utility is ....... long, and
full of specialized flags to filter and sort the informations. With Nushell, you only
need one flag: `--json`. Then, you can use the syntax you've already learned to perform
the same manipulations.

```
example of a a clever thing to do with squeue
```
I suspect Nushell will eat many of my workflows this way in the future. 

# Nushell and Python

>[!warning] remove this, it's half baked and the post is too long. I'll come back to it in another post if it pans out

Nushell's `http` and ......(datafarme) ....... are other highlights for me. As soon as a
remote resource was involved, I always reverted to [[Python]] . I never really took the
time to understand [[curl]] or [[wget]]. {stencence about dataframe} Thanks to http and
......., a lot of what was previously a script is now a one-liner. 

It is true to a point where I started thinking: what is the relationship between Nushell
and Python? How to they itneract with each other? Manipulating dataframes was an obvious
use case for Python. I wonder if nushell will absorb some of these responsibilities in
my day to day. 

Another approach is to use nushell inside python. Does it make sense to want to be able
to use Nushell programs inside python code, for instance? To reuse that structured data
manipulation syntax that I already use to sort files and list processes on my OS? To be
clear, what I'm suggesting is
```python
df = pd.read_parquet('my_dataframe.parquet')
# usual python code
new_dataframe = nushell(df, '...... valid sequence of nushell ops')
```

It seems like a stretch. The compilation-serialization-deserialization overhead that we
need to send a dataframe to nushell probably makes this impractical. I'm already fluent
in python, so I would probably end up manipulating the dataframe in python directly. But
Rust has surprised us before.

Only time will tell.

