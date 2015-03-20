    C:\dev\,-components/**/*.*,-node_modules/**/*.*

function bower_install() {
	bower install

	if [ "$?" -ne 0 ]; then bower_install; fi
}

bower_install
echo ' ========== \n bower_install done \n ==============' 


COMMAND="bower install;"; start bash -c "${COMMAND}"; start bash -c "${COMMAND}"; start bash -c "${COMMAND}"; start bash -c "${COMMAND}"; 

angular.element('[data-test="quidget_6"] .quidget__section--prices').scope().pricesCtrl._model.offer

gulp integration 2>&1 | tee /c/sandbox/build.log

-:user=noemail:**
-:user=buildagent:**
-:user=%env.BUILD_USER%:**

Git Cheat Sheet
====

Bash
===

 - OSX uses `~/.bash_profile` instead of `.bashrc` file
 - Use the `open` command on OSX to open an application

DNS Stuff

Check DNS entries:

`host -a codemasters.com`

Check nameservers:

`host -t ns bj.ma`

Find the domain associated with an IP:

`host 192.168.1.1`
 
 
Fast delete on windows:

rmdir /s /q <path to directory>

##Less

End of file: `shift+g`
Previous page: `b`
Next page: `spacebar`
Next line: `j`
Previous line: `k`


.bashrc for windows:

        GetBranch()
        {
          cat /c/dev/evolve/.git/HEAD | sed 's+^ref: refs/heads/++'
        }
            export PS1="\[\e]0;\w\a\]\n\[\e[32m\]\u@\h \[\e[36m\]\$(GetBranch) \[\e[33m\]\w \[\e[0m\] \n\$ [go|b|g|gr|gt|gtc|tce|tcs|lo|sit|sta]:"
            alias go="cd /c/dev/evolve/execution-app"
            alias g="git"
            alias gt="grunt test"
            alias gs="grunt server"
            alias gr="grunt"
            alias gtc="grunt tc"
            alias b="start bash"
            alias tce="start chrome http://teamcity.it.hk.hibm.hsbc/project.html?projectId=Evolve_ExecutionApp"
            alias tcs="start chrome http://teamcity.it.hk.hibm.hsbc/project.html?projectId=Evolve_EvolveHtmlGui"
            alias lo="start chrome http://localhost:23100/components/rig/"
            alias sit="start chrome https://sit-fxsalesui.uk.hsbc/evolve/"
            alias sta="start chrome http://hkl100311.hk.hsbc/stash/projects/EVOLVE/repos/evolve/browse"
            cd /c/dev/evolve/execution-app


##Git

alias g='grunt'

###Overview

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


Configure bash prompt: echo $PS1
PS1="my new prompt"

.bashrc

GetBranch()
{
  cat /c/dev/evolve/.git/HEAD | sed 's+^ref: refs/heads/++'
}
    export PS1="\[\e]0;\w\a\]\n\[\e[32m\]\u@\h \[\e[36m\]\$(GetBranch) \[\e[33m\]\w \[\e[0m\] \n\$ [go|g|b|gt|gtc]:"
    alias go="cd /c/dev/evolve/execution-app"
    alias g="git"
    alias gt="grunt test"
    alias gtc="grunt tc"
    alias b="start bash"
    alias tce="start chrome http://teamcity.it.hk.hibm.hsbc/project.html?projectId=Evolve_ExecutionApp"
    alias tcs="start chrome http://teamcity.it.hk.hibm.hsbc/project.html?projectId=Evolve_EvolveHtmlGui"
    cd /c/dev/evolve/execution-app


Show tags: `git log --tags --decorate=full`

Count lines: `git branch -r | wc -l `

Git show a merge: git log, notice the commit message, invert the shas and git diff a..b

Cofiguree a tracking branch. track a remote: git branch -u upstream/foo
###Configuration

`git config --global alias.st status &&` 
`git config --global alias.br branch &&`
`git config --global alias.ch checkout &&`
`git config --global alias.co commit &&`
`git config --global alias.ad add &&`
`git config --global alias.pu pull &&`
`git config push.default current`


`git config --global user.name "Ben Aston"`

`git config --global user.email "ben@bj.ma"`

`git config --global apply.whitespace nowarn`

`git config core.autocrlf false`

`git config --global merge.tool tortoisemerge` //optional

`git config --global mergetool.tortoisemerge.cmd '"C:/Program Files/TortoiseGit/bin/TortoiseGitMerge.exe" -base:"$BASE" -theirs:"$REMOTE" -mine:"$LOCAL" -merged:"$MERGED"'`

Create a file named `.gitignore` in the root of the project and populate it with:

```
.DS_Store
.idea
node_modules
reports
.tmp
```

#####Check the current config `git config --list` 

#####Check a single setting `git config <setting-name>`

----

###Bisect

`git bisect start`
`git bisect bad                 # Current version is bad`
`$ git bisect good v2.6.13-rc2 `

----

###Merging

`git checkout --ours / --theirs <filename>`

----

###Branches

#####Checkout remote branch and track `git checkout -b test origin/test`  git ch blotter-integration-spike

#####View changes between branches `git diff <branch-a> <branch-b> //shows changes introduced moving from branch-a to branch-b`

#####List branches by "creator" `git for-each-ref --format='%(committerdate) %09 %(authorname) %09 %(refname)' | sort -k5n -k2M -k3n -k4n | grep "<committer name>"`

#####Show from another branch `git show branch-1:path/file-name.js > ~/Desktop/foo.js`

#####Compare two branches `git diff --name-status <branch-a>..<branch-b>`

#####Difference between a single file on two branches `git diff master~20:<file-name> <file-name>`

#####Filter by type of change `git diff --diff-filter=M branch-a..branch-b --name-status`

#####Show all local branches `git branch`
 
#####Switch to an existing local branch `git checkout <branch name>`
 
#####Create a new branch `git checkout -b <branch name>`
 
#####Delete a local branch `git branch -D <branch name>`
 
#####Pull from another branch `git pull . master`

#####Switch back to the branch you were previously on `git checkout -`

#####Rename a branch `git branch -m <new-name-no-spaces>`

----

###Remotes

#####Undo push

In general, you don't bother with this because it destroys the tree.

```
git checkout alpha-0.3.0
git reset --hard cc4b63bebb6
git push origin +alpha-0.3.0
```

Instead you should use `revert`:

```git revert -m 1 <sha>```

#####List remote branches `git branch -r`

#####Reset to remote HEAD `git reset --hard origin <branch-name>`

#####Configure tracking information `git branch --track <local> <remote/branch>`

#####Delete remote branch `git push origin :<branch-name>`

####Replay your new commits on top of everyone else's work
`git fetch && git rebase master` (if you want to rebase against `master`)

#####Remove remote `git remote rm <remote-name>`

#####Set remote URL `git remote set-url heroku git@heroku.com:intense-dusk-2508.git`

#####View tracking information `git branch -vv`

#####Bring yourself up to date with another branch in a clean way `git rebase <branch-name-to-pull-from>`.

#####Undo a merge use `git reset --hard`

#####Create remote branch `git checkout -b foo && git push origin foo` (pushing creates the branch)

#####Pull via rebase `git pull  -r`

#####Reversion of a remote change

 1. reset your local index to the desired sha
    `git reset --hard sha`

 2. move the branch pointer back to the HEAD immediately preceding the HEAD at the desired SHA
 The 'soft' means that the changes made between the HEAD-1 and HEAD at the desired SHA
 are left in place and are visible as 'new' changes
    `git reset --soft HEAD@{1}`

`git commit -m "Revert to sha"`

#####Reset file to specific SHA

`git checkout abcde file/to/restore`

----

###The Index

#####Remove untracked files and directories (WARNING this will remove files) `git clean -df` (`-n` does a dry run)

#####Delete a file `git rm <file>`

#####Show staged changes (i.e. changes in the index) `git diff --cached`

#####Un-add a file `git reset <filename>`

#####Un-add everything staged `git reset` or `git rm -r --cached .` (note the dot).

----

###Cherry Picking

#####Cherry pick from another repo

 1. `git remote add my-repo-to-pull-from /c/my-location/my-repo-to-pull-from/.git`
 1. `git fetch my-repo-to-pull-from`
 1. `git cherry-pick <sha-in-the-repo-to-pull-from>`

#####Pull a single commit `git cherry-pick <sha>`, `git mergetool`, `git cherry-pick --continue`

----

###Commits

#####View author of changes within a file `git blame -c Src/Editorial.Core/Queries/InsertReportIssueQuery.cs`

#####Show all files affected by commit `git diff 028343b..c252785 --name-status`

#####Find a commit with a commit message matching an expression `git log --grep=C211676`

#####Reverse log from a commit `git log --reverse --ancestry-path <sha>^..master` (reset to HEAD first)

#####View the modifications associated with a commit `git show <sha>`

#####Find a commit by message `git log --grep <message-regex>`

#####Revert To Commit `git reset --hard <SHA of commit>`

#####Re-play all your work not yet pushed onto the top of the remote `git rebase master`

#####Interactively modify your commits `git rebase -i <commit-sha-from-which-you-want-to-rebase>` //Most recent at the bottom of the commit list. Fix-up will
e.g. `git rebase -i HEAD~6` (last six commits). 

#####Reset to a commit n commits ago `git reset --hard HEAD~n`
 
#####Show changes for a file in a commit `git show SHA <filename>`

#####Show file at a specific revision `git show SHA:<filename>`

#####Include a diff in your commit message `git commit -v`

#####Write a specific version to a file `git show SHA:<filename> > output-filename`

#####View commits between dates `git log --name-status --since="17th August 2012" --until="18th August 2012" --author="Ben"`

#####Show all changes in a commit `git show --name-status SHA`

#####Amend a commit `git commit --amend` //...and then "i" to insert text, "ESC" to escape insertion mode, "wq" to write the message and quit the text editor

#####Reset a single file to a specific commit `git checkout <sha> file`

#####Show the log of commits for a single user `git log --author="Jon"`

#####Show the history for a file, following renames `git log --follow -p file`

#####Show the changes associated with a commit `git show <sha>`

####Diff a single file with index: `git diff -- <file name> or git diff HEAD -- <file name>`

#####Show changes made in a single commit for a single file `git show <sha> <file>`

#####Diff between two versions `git diff 65d18cf7^1..65d18cf7 <filename>`

#####Create patch from last commit `git show HEAD > some-patch0001.patch`

#####File names changed between commits `git diff --name-only HEAD^1...HEAD`

#####Create patch for specific commit `git format-patch HEAD^ --stdout > patchfile.patch`

####Show commits from *all* branches `git log --all` (plain git log just shows the commits leading up to the current HEAD)

####Change timestamp of commit `git commit --amend --date="Mon Feb 17 14:14:14 2014 +0000"`

####Change the author of a commit `git commit --amend --author "New Author Name <email@address.com>" `

----

###Tags

####Create tag
`git tag -a 0.0.2 -m "Tagging 0.0.2 <Ben>"`

----

###Log

####Graph changes over time
`git log --graph --decorate --oneline --author="benaston" --since="11 Feb"`

####View diffs in log
`git log -p` or;
`git log -p <filename>`

####Log for single file
`git log --name-status <filename>`

####Show changes over time
`git log`

####Log at certain times
`git log --name-status --since="17th AUgust 2012" --until="18th August 2012" --author="Ben"`

####Search log for a word
`git log --name-status --grep Ben` or `git log --name-status | grep Ben -A 7 | less`

####Show the log around that sha
`git log sha`

##Stashing
####Stash everything not added (good for web.config)
`git stash --keep-index`

####Stash your work
`git stash`

####Stash only some of your changes
`git add <filenames-you-want>` `git stash --keep-index`

####Un-stash your work
`git stash apply`

####Associate a message with a stash
`git stash save "message associated with stash"`

###Recovering from a major screw-up (lost work)

####Find work that has been "lost"
`git reflog --grep "Known commit message."`

----


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
   
Fetch brings all the objects from a remote so that you are then up to date.

Merge combines changes into a branch.

Pull does a fetch and a merge.

Configuring a local branch to be a tracking branch enables use fo push and pull without arguments.

To configure a tracking branch, you need to set the merge attribute of the local branch in the .gitconfig.

e.g. `git branch --track <local> <remote/branch>`

**Index is retained across branch switching.**








**Reset to last pulled version:** `git reset --hard tfs/default` 

**Reset to very latest in the remote TFS:**  `git-tfs fetch; git reset --hard tfs/default`

**View current work:** `git status`

**Fetch and merge in other people's commits:** `git-tfs pull`

**Push:** `git-tfs checkintool -i default`
 

##Bash Shortcuts
 
**Clear Screen:** `CTRL+L`

**Clear line:** `CTRL+U`

**History:** `history`

**Explorer in current directory:** `explorer .`

**History search:** `CTRL+R` (then start typing the command)



Keep index and stash: `git stash --keep-index`

Best git tutorial bar none: http://www.atlassian.com/git/tutorial/git-basics





Find latest version of a deleted file: `git log --name-status --follow -p -- Src/DnR.Editorial.App/Controllers/LoggerController.cs`

Pull from a remote and avoid the merge commit: `git pull --rebase`

View file at revision:

`git show <revision>:./file/path.foo`

Differences between two branches `git diff --name-status master..branch`

for $doc in doc() return xdmp:document-delete(xdmp:node-uri($doc))

Undo `git add .`: `git reset`

Grepping: `git log --grep='\[92\]'` - note the single quotes!

Reset single file to remote head git checkout tfs/default file-name

Reset to remote head: git reset --hard origin/HEAD (using git-tfs: git reset --hard tfs/default)



git branch -m <branch name> <new branch name>

View diff with remote for single file: `git diff remote/uri file`

Show file at a revision: `git show HEAD~4:index.html` or `git show 67834b:index.html`

`sudo service mongodb start`
`sudo service mongodb stop`

##VI

`/` to start search.
