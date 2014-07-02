Git Cheat Sheet
====

##VI

`/` to start search.

##Git

Show staged changes (i.e. changes in the index): `git diff --cached`

Create remote branch: `git checkout -b foo && git push origin foo` (pushing creates the branch)

Set alias: `git config --global alias.st status` 
            `git config --global alias.br branch`
            `git config --global alias.co checkout`

Set remote URL: `git remote set-url heroku git@heroku.com:intense-dusk-2508.git`

Create patch from last commit: `git show HEAD > some-patch0001.patch`

Create patch for specific commit: `git format-patch HEAD^ --stdout > patchfile.patch`

Change timestamp of commit: `git commit --amend --date="Mon Feb 17 14:14:14 2014 +0000"`
Remove untracked files and directories (WARNING this will remove files): `git clean -df`. (`-n` does a dry run)

Delete a file: `git rm <file>`

Pull a single commit: `git cherry-pick <sha>`, `git mergetool`, `git cherry-pick --continue`.


Replay your new commits on top of everyone elses work `git fetch && git rebase master` (if you want to rebase against `master`)

Show changes made in a single commit for a single file: `git show <sha> <file>`

Show commits from *all* branches: `git log --all` (plain git log just shows the commits leading up to the current HEAD)

`sudo service mongodb start`
`sudo service mongodb stop`

Checkout remote branch and track:

`git checkout -b test origin/test`

List branches by "creator": `git for-each-ref --format='%(committerdate) %09 %(authorname) %09 %(refname)' | sort -k5n -k2M -k3n -k4n | grep "Ben Aston"`

Difference between a single file on two branches:  `git diff master~20:pom.xml pom.xml`

Filter by type of change: `git diff --diff-filter=M us78044-form-definition-in-search-results..2-merge-from-paul-2 --name-status`

Show all files affected by merge including those fast forwarded: git diff 028343b..c252785 --name-status
Show from another branch: `git show branch-1:path/file-name.js > ~/Desktop/foo.js`
Configure line endings: ` git config core.autocrlf false` (or use input) (see below for explanation).

View current setting:  `git config core.autocrlf`

This is how core.autocrlf appears to work currently (or at least since v1.7.2 from what I am aware):

core.autocrlf = true
Text files checked-out from the repository will have LF EOL characters normalized to CRLF in your working tree.
Text files in your working tree with CRLF EOL characters are normalized to LF when committed back to the repository.
core.autocrlf = input
Text files checked-out from the repository will keep original EOL characters in your working tree.
Text files in your working tree with CRLF EOL characters are normalized to LF when committed back to the repository.
core.autocrlf = false
core.eol dictates EOL characters in the text files of your working tree.
core.eol = native by default, which means Windows EOLs are CRLF and Unix-based OS are LF in working trees.
Repository gitattributes settings determines EOL character normalization for commits to the repository (default is normalization to LF EOL characters).

Download tortoisegit from here: (when installing, don't bother with the shell exension).

    git config --global merge.tool tortoisemerge 

    git config --global mergetool.tortoisemerge.cmd '"C:/Program Files/TortoiseGit/bin/TortoiseGitMerge.exe" -base:"$BASE" -theirs:"$REMOTE" -mine:"$LOCAL" -merged:"$MERGED"'

Add to `.gitconfig`:

    [merge]
        tool = tortoisemerge
    [mergetool "tortoisemerge"]
        path = C:\\Program Files\\TortoiseGit\\bin\\tortoisegitmerge.exe
   
##Overview

    working directory -> index -> local repository -> remote repository (e.g. origin server)
           ^               ^              ^                    ^   
           |               |              |                    |
    You do your work here. |              |___                 |
 					       |                  |                |
              You prepare your commits here.  |                |
                                              |                |
                                        You commit here.       |    
                                                               |
                                                      You push & pull here
                                                      to integrate with
                                                      others' work.
##Configure

`git config push.default current`

`git push origin feature/US72097-Mdmt-Provisioning`

`git config --global user.name "Ben Aston"`

`git config --global user.email "ben@bj.ma"`

`git config --global apply.whitespace nowarn` //do not warn about whitespace changes, useful for languages where whitespace does not matter

`git config --list` //check the current config

`git config --global alias.co checkout`
`git config --global alias.pl pull`
`git config --global alias.ps push`
`git config --global alias.co commit`

`git config --global alias.co checkout` //alias checkout

File names changed between commits:

`git diff --name-only HEAD^1...HEAD`

Create a file named `.gitignore` in the root of the project and populate it with patterns:

`*.log`, for example.

Include a diff in your commit message: `git commit -v`

View changes between branches: `git diff <brancha> <branchb>` (in this you will conveniently see the changes introduced by branch b)

Delete remote branch: `git push origin :<branch-name>`

View diffs in log: `git log -p`

View tracking information: `git branch -vv   # doubly verbose!`

Bring yourself up to date with another branch in a clean way: `git rebase <branch-name-to-pull-from>`.

Undo a merge: use git reset --hard.

Fetch brings all the objects from a  remote so that you are then up to date.

Merge combines changes into a branch.

Pull does a fetch and a merge.

Configuring a local branch to be a tracking branch enables use fo push and pull without arguments.

To configure a tracking branch, you need to set the merge attribute of the local branch in the .gitconfig.

e.g. `git branch --track <local> <remote/branch>`

**Index is retained across branch switching.**

Undo push:

git checkout alpha-0.3.0
git reset --hard cc4b63bebb6
git push origin +alpha-0.3.0

##Recovering from a major screw-up (lost work)

Find work that has been "lost": `git reflog --grep "Known commit message."`

##Branching
 
**Show All:** `git branch`
 
**Change:** `git checkout <branch name>`
 
**New:** `git checkout -b <branch name>`
 
**Delete:** `git branch -D <branch name>`
 
**Difference:** `git diff --name-status <branch1>..<branch2>`
 
**Pull in from another:** `git pull . master`

**Rename:** `git branch -m <new-name-no-spaces>`

Configure GitK:

Update `.gitk` file.

##Committing

**Stash everything not added (good for web.config):** `git stash --keep-index`

##Moving through time & commits
 
**Show changes over time:**  `git log`

**Reset to last pulled version:** `git reset --hard tfs/default` 

**Reset to very latest in the remote TFS:**  `git-tfs fetch; git reset --hard tfs/default`

**Stash your work:** `git stash`

**Stash only some of your changes:** `git add <filenames-you-want>` `git stash --keep-index`

**Un-stash your work:** `git stash apply`

**View current work:** `git status`

**Find a commit by message:** `git log --grep <message-regex>`

**Revert To Commit:** `git reset --hard <SHA of commit>`

**Find commit n commits ago:** `git reset --hard HEAD~n`
 
**View commits between dates:** `git log --name-status --since="17th August 2012" --until="18th August 2012" --author="Ben"`

**Fetch and merge in other people's commits:** `git-tfs pull`

**Log for single file:** `git log --name-status <filename>`

**Show changes for a file in a commit:** `git show SHA <filename>`

**Show file at a specific revision:** `git show SHA:<filename>`

**Write a specific version to a file:** `git show SHA:<filename> > output-filename`

**Show all changes in a commit:** `git show --name-status SHA`

**Amend a commit:** `git commit --amend` (and then "i" to insert text, "ESC" to escape insertion mode, "wq" to write the message and quit the text editor)

**Push:** `git-tfs checkintool -i default`
 
##Re-ordering commits

Re-play all your work not yet pushed onto the top of the remote: `git rebase master`

Interactively modify your commits: `git rebase -i <commit-sha-from-which-you-want-to-rebase>` e.g. `git rebase -i HEAD~6` (last six commits).

Most recent at the bottom of the commit list. Fix-up will squash the lower (i.e. later) commit into the higher (i.e. earlier commit). 

##Bash Shortcuts
 
**Clear Screen:** `CTRL+L`

**Clear line:** `CTRL+U`

**History:** `history`

**Explorer in current directory:** `explorer .`

**History search:** `CTRL+R` (then start typing the command)

Git log, showing file diff: `git log -p <filename>`

Keep index and stash: `git stash --keep-index`

Best git tutorial bar none: http://www.atlassian.com/git/tutorial/git-basics

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
