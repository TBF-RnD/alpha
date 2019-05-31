# Sample files for prediction

Create json profiles from links in links file.  Note that they use a proxy for access to wikipedia where otherwise blocked.

Usage:

```
make all
```
Downloads all links and creates json profiles

```
make -j4 all
```
For running parallel instances where possible. Note that this might lead to memory problems for large sets. 
