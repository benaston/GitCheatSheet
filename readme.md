Git Cheat Sheet
====

Nicer git blame: ` git blame -c Src/Editorial.Core/Queries/InsertReportIssueQuery.cs`

Diff between two versions: `git diff 65d18cf7^1..65d18cf7 Src/Editorial.Core/Queries/InsertReportIssueQuery.cs`

Graph changes over time: `git log --graph --decorate --oneline --author="benaston" --since="11 Feb"`

Find latest version of a deleted file: `git log --name-status --follow -p -- Src/DnR.Editorial.App/Controllers/LoggerController.cs`

Pull from a remote and avoid the merge commit: `git pull --rebase`

View file at revision:

`git show <revision>:./file/path.foo`

Log at certain times: git log --name-status --since="17th AUgust 2012" --until="18th August 2012" --author="Ben"

Differences between two branches `git diff --name-status master..branch`

for $doc in doc() return xdmp:document-delete(xdmp:node-uri($doc))

Undo `git add .`: `git reset`

Grepping: `git log --grep='\[92\]'` - note the single quotes!

Reversion of a remote change:

The following git commands enable you revert a remote change...

reset your local index to the desired sha
`git reset --hard sha`

 move the branch pointer back to the HEAD immediately preceding the HEAD at the desired SHA
 The 'soft' means that the changes made between the HEAD-1 and HEAD at the desired SHA
 are left in place and are visible as 'new' changes
`git reset --soft HEAD@{1}`

`git commit -m "Revert to sha"`

`git-tfs checkintool` (or whatever syntax you use for pushing to the remote)


Find a commit with a commit message matching an expression: `git log --grep=C211676`

Reset a single file to a specific commit: `git checkout <sha> file`

Show the log of commits for a single user: `git log --author="Jon"`

Show the history for a file, following renames: `git log --follow -p file`

Show the changes associated with a commit: `git show <sha>`

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

View diff with remote for single file: `git diff remote/uri file`

View the commits with a message containing a word: `git log --name-status --grep Ben` or `git log --name-status | grep Ben -A 7 | less`

View the modifications associated with a sha: `git show bd61ad98`

Show file at a revision: `git show HEAD~4:index.html` or `git show 67834b:index.html`
