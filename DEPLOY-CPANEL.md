# Deploying Khariz Digital on shared hosting (cPanel)

The website is exported as plain files: HTML, CSS, JavaScript, images and
video. The server only has to hand those files out, so it needs **no Node.js,
no PHP and no database**. Any cPanel shared hosting plan works.

What gets uploaded is the `upload/` folder (or `khariz-digital-upload.zip`,
which holds the same files). Nothing else in this project goes on the server.

---

## Before you start

You need:

- Your cPanel login (usually `https://your-domain.com/cpanel` or
  `https://your-domain.com:2083`).
- The domain pointed at the hosting account (nameservers or A record set at
  your registrar). If the domain shows the host's default page, it is ready.
- Node.js 20 or newer on **your own computer**, to build the package.
- About 150 MB of free disk space on the hosting account.

The site must sit at the **root of a domain or subdomain**, for example
`https://kharizdigital.com.ng/` or `https://www.kharizdigital.com.ng/`. It will not
work inside a sub-folder such as `https://example.com/khariz/`, because its
links and images use addresses that start at `/`.

---

## Step 1 — Set the site address and build the package

On your computer, in a terminal:

```bash
cd site
npm install                         # first time only
cp .env.production.example .env.production
```

Open `site/.env.production` and put in your real address, with `https://` and
without a slash at the end:

```
NEXT_PUBLIC_SITE_URL=https://kharizdigital.com.ng
```

Then build:

```bash
npm run package
```

This prepares the images, builds every page and writes, in the project's top
folder:

- `upload/` — the finished website.
- `khariz-digital-upload.zip` — the same files as one archive (about 130 MB).

The command ends by printing "Built for https://…". If it prints a note that
no address is set, fix `.env.production` and run it again.

**Check it before uploading:**

```bash
npm run preview                     # serves upload/ at http://localhost:3000
```

Open the home page, the Work page, a project and a demo. Press Ctrl+C in the
terminal to stop it.

---

## Step 2 — Find the right folder in cPanel

1. Log in to cPanel and open **File Manager**.
2. Go to the folder that belongs to your domain:

   | Your site address | Folder |
   |---|---|
   | The account's main domain | `public_html` |
   | An addon domain | the "Document Root" shown under **Domains** (often `public_html/yourdomain.com` or a folder beside `public_html`) |
   | A subdomain such as `www2.` or `studio.` | its own Document Root, shown under **Domains** |

3. In File Manager click **Settings** (top right), tick **Show Hidden Files
   (dotfiles)** and save. You need this to see `.htaccess`.
4. If the folder holds the host's placeholder files (`index.html`,
   `default.html`, `index.php`, a `cgi-bin` folder), delete the placeholder
   pages. Leave `cgi-bin` and any `.well-known` folder alone.

---

## Step 3 — Upload

### Option A: File Manager (simplest)

1. Inside the domain's folder, click **Upload**.
2. Choose `khariz-digital-upload.zip` and wait for the bar to reach 100%.
3. Go back to the folder, select the zip, click **Extract**, and extract into
   the **current folder**.
4. Check that `index.html`, `404.html`, `.htaccess` and the folders `_next`,
   `work`, `demos`, `projects`, `images` are **directly inside** the domain's
   folder, not inside an extra `upload` folder. If they landed in a
   sub-folder, select everything in it, click **Move** and move it up one
   level.
5. Delete the zip from the server.

If the upload stops or the host refuses a file that large, use Option B.

### Option B: FTP (for slow connections or upload limits)

1. In cPanel open **FTP Accounts** and note the host name, user name and
   password (or create an account limited to the domain's folder).
2. Connect with FileZilla (or any FTP program) using FTP over TLS, port 21.
3. In FileZilla turn on **Server → Force showing hidden files**.
4. Upload the **contents** of your local `upload/` folder (not the folder
   itself) into the domain's folder. Make sure `.htaccess` is included.

There are several thousand small files, so FTP takes a while. Let it finish
and re-queue any failed transfers.

---

## Step 4 — Turn on https

1. In cPanel open **SSL/TLS Status** and click **Run AutoSSL** (most hosts
   issue a free certificate automatically; some call it "Let's Encrypt SSL").
2. When `https://your-domain.com` opens with a padlock, open `.htaccess` in
   File Manager (right-click → **Edit**) and remove the `#` at the start of
   the four lines at the bottom, under "To force https". Save.

From then on, `http://` addresses move to `https://` automatically.

To send `www.your-domain.com` to the bare domain (or the other way round),
use **Domains → Redirects** in cPanel.

---

## Step 5 — Check the live site

Open these on your phone and on a computer:

- [ ] `/` — home page loads, the hero film plays, six selected works show.
- [ ] `/work/` — the gallery shows; search, category filters and page numbers
      work.
- [ ] `/work/rapporta/` — a project page; "View Website" opens the demo in a
      new tab.
- [ ] `/demos/rapporta/` and `/demos/boutique-hotel/` — demos load with their
      own styling; the "← Khariz Digital" link returns to the project page.
- [ ] `/demos/kravio/` — the Kravio dashboard loads.
- [ ] `/contact/` — "Send on WhatsApp" opens WhatsApp with the message.
- [ ] Footer — "Start a project" and "Collaborate with us" open WhatsApp.
- [ ] `/this-page-does-not-exist/` — the "This page does not exist" screen
      shows.
- [ ] `/sitemap.xml` — the addresses start with your real domain.

---

## Updating the site later

1. Make your changes in `site/` (see `docs/content-editing-guide.md`).
2. Run `npm run package` again.
3. Upload the new zip and extract it over the old files (choose to overwrite),
   or upload the changed files by FTP.
4. Files inside `_next/` get new names on every build. Old ones are harmless;
   to tidy up, delete the `_next` folder on the server before extracting.

Visitors may see the old version for a short time. Pages are set to
re-check for updates on every visit, so a normal refresh is enough.

---

## If something goes wrong

| What you see | Likely cause | Fix |
|---|---|---|
| The host's default page, or a list of files | The files are in the wrong folder, or an old `index.php`/`default.html` is still there | Check Step 2 and Step 3.4; delete the placeholder pages |
| Page loads with no styling, or images are missing | Files ended up one folder too deep, or the site is in a sub-folder of a domain | Move everything up so `index.html` is in the domain's folder; the site must be at the root of a domain or subdomain |
| "403 Forbidden" | Folder or file permissions | In File Manager set folders to `755` and files to `644` (select all → **Permissions**) |
| "500 Internal Server Error" right after upload | The host does not allow one of the settings in `.htaccess` | Rename `.htaccess` to `.htaccess-off`. If the site then works, edit the file and remove the `<IfModule mod_headers.c>` block, then rename it back |
| A plain "404 Not Found" page instead of the site's own | `.htaccess` was not uploaded | Turn on hidden files and upload `.htaccess` from `upload/` |
| Inner pages work only with a slash at the end | Normal: every page is a folder. Links on the site already include the slash | Nothing to do |
| The Elera project's "View Website" does not open | That dashboard lives on its own address, `nazday-elera.vercel.app` | Keep that Vercel deployment running, or remove `liveUrl` from Elera in `site/content/projects.ts` |
| Sharing a link shows no preview image | The site address was not set before building | Do Step 1 again with the right address, then re-upload |
| Upload fails part-way | File size or time limit on the host | Use FTP (Option B) |

---

## What is on the server

```
public_html/
  index.html            home page
  404.html              "page does not exist" screen
  .htaccess             404 page, compression, caching, optional https redirect
  work/                 gallery and one folder per project
  services/ about/ contact/
  demos/                the demo websites (and demos/kravio/, the Kravio dashboard)
  _next/                the site's CSS and JavaScript
  projects/ founder/ brand/      images for the agency pages
  images/ showcase/     images and video for the demos
  sitemap.xml  robots.txt  icon.png
  hero-shadows.*  about-water-3.*   background films
```

Nothing here needs a database or scheduled task, and there is nothing to
"restart": replacing the files is the whole deployment.
