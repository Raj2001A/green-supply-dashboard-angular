# 📚 Git Commands Quick Reference

## Essential Commands for This Project

### Initial Setup (Already Done ✅)
```bash
git init                                    # Initialize repository
git add .                                   # Stage all files
git commit -m "Initial commit"              # Create first commit
```

### Connect to GitHub
```bash
# Add remote repository (do this once)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin master
```

---

## Daily Workflow

### Making Changes
```bash
# Check status
git status

# Stage specific files
git add src/app/pages/dashboard.component.ts

# Stage all changes
git add .

# Commit with message
git commit -m "Add dashboard metrics feature"

# Push to GitHub
git push
```

### Viewing History
```bash
# View commit history
git log

# View compact history
git log --oneline

# View changes
git diff
```

---

## Branching

### Create and Switch Branches
```bash
# Create new branch
git branch feature/new-feature

# Switch to branch
git checkout feature/new-feature

# Create and switch in one command
git checkout -b feature/new-feature

# List all branches
git branch -a

# Delete branch
git branch -d feature/old-feature
```

### Merging
```bash
# Switch to master
git checkout master

# Merge feature branch
git merge feature/new-feature

# Push merged changes
git push
```

---

## Undoing Changes

### Before Commit
```bash
# Unstage file
git reset HEAD filename.ts

# Discard changes in file
git checkout -- filename.ts

# Discard all changes
git reset --hard
```

### After Commit
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Amend last commit message
git commit --amend -m "New message"
```

---

## Syncing with GitHub

### Pull Latest Changes
```bash
# Fetch and merge
git pull

# Fetch only
git fetch

# Pull with rebase
git pull --rebase
```

### Push Changes
```bash
# Push to current branch
git push

# Push new branch
git push -u origin branch-name

# Force push (use carefully!)
git push --force
```

---

## Useful Commands

### Stashing
```bash
# Save changes temporarily
git stash

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply and remove stash
git stash pop
```

### Tagging (for Releases)
```bash
# Create tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Push tags
git push --tags

# List tags
git tag -l
```

---

## Common Scenarios

### Scenario 1: Update README
```bash
# Edit README.md
git add README.md
git commit -m "docs: Update README with deployment instructions"
git push
```

### Scenario 2: Add New Feature
```bash
# Create feature branch
git checkout -b feature/supplier-search

# Make changes...
git add .
git commit -m "feat: Add supplier search functionality"

# Switch to master and merge
git checkout master
git merge feature/supplier-search
git push

# Delete feature branch
git branch -d feature/supplier-search
```

### Scenario 3: Fix Bug
```bash
git checkout -b fix/chart-rendering
# Fix the bug...
git add .
git commit -m "fix: Resolve chart rendering issue on mobile"
git checkout master
git merge fix/chart-rendering
git push
```

---

## Commit Message Best Practices

### Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
git commit -m "feat: Add carbon footprint calculator"
git commit -m "fix: Resolve map initialization timing issue"
git commit -m "docs: Update installation instructions"
git commit -m "style: Format code with Prettier"
git commit -m "refactor: Simplify API service methods"
```

---

## Troubleshooting

### Merge Conflicts
```bash
# When conflict occurs
git status                    # See conflicted files
# Edit files to resolve conflicts
git add .
git commit -m "Resolve merge conflicts"
```

### Accidentally Committed to Wrong Branch
```bash
# On wrong branch
git reset HEAD~1              # Undo commit
git stash                     # Save changes
git checkout correct-branch   # Switch branch
git stash pop                 # Apply changes
git add .
git commit -m "Your message"
```

---

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `git status` | Check current status |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit with message |
| `git push` | Push to GitHub |
| `git pull` | Pull from GitHub |
| `git log` | View history |
| `git branch` | List branches |
| `git checkout -b name` | Create new branch |

---

**Keep this file handy for quick reference! 📖**

