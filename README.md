# mczachurski.dev

Files for my homepage: [https://mczachurski.dev](https://mczachurski.dev)

** Generate dominant colors **

```bash
$ convert DSC00122m.jpg -scale 50x50! -depth 8 +dither -colors 8 -format "%c" histogram:info: | sed -n 's/^[ ]*\(.*\):.*[#]\([0-9a-fA-F]*\) .*$/\1,#\2/p' | sort -r -n -k 1 -t ","
```