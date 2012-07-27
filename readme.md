Git Cheat Sheet
====

Diff a single file with index: git diff -- <file name> or git diff HEAD -- <file name>

Reset single file to remote head git checkout tfs/default file-name

Reset to remote head: git reset --hard origin/HEAD (using git-tfs: git reset --hard tfs/default)

`git stash save "message associated with stash"`

Yet another cheat sheet of git commands.

Todo add basic log commands (with grep pipe), rebase commands for commit squashing (rebase -i HEAD^3, f).

Information on working copy, index and remote.

git commit --amend  to ammend the previous commit with the current added changes

git log sha - will show the log around that sha

git checkout - (switch back to the branch you were previously on)

git commit --amend

git checkout - (go to previous branch)

git branch -m <branch name> <new branch name>

diff with remote for file

git diff remote/uri file