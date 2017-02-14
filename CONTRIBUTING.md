# How to develop on c4ministry.com

### Make a new branch and push it to GitHub.
```bash
git checkout -b feature_branch_name
git push -u origin feature_branch_name
```

### Updating from Master
```bash
git pull origin master
```

### Merge from master
```bash
git checkout feature_branch_name
git merge master
```

## How to have a fresh install of c4ministry

```sh
# Clone the repository on your machine
git clone https://github.com/davidgumzchoi/c4ministry.git

# Head into the local repository
cd c4ministry

# Create a new feature branch
git checkout -b feature/my-new-feature

# Add some work

# Make a beautiful commit, reference related issues if needed
git commit -m "your beautiful commit message"

# Push your branch
git push -u origin feature/my-new-feature

# Then make a pull request!
```