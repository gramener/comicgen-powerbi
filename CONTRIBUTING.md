# Contributing to this repo

Please [raise an issue](https://github.com/gramener/comicgen-powerbi/issues) if there's a specific
feature you would like to contribute.


## Submission

- Update `package.json`:
  - Update `dependencies.comicgen` to the latest Comicgen version
- Run `npm install` to update `package-lock.json`
- Update `pbiviz.json`
  - Increment `visual.version`
  - Update any `externalJS` files required
  - Ensure that `visual.guid` is unchanged.
    (When testing locally, this must be changed to refresh on Power BI)
- Update `README.md`
  - Add changes clearly to the "Change log" section
- Run `pbiviz package` to create `dist/comicgen<guid>.<version>.pbiviz` and `dist/package.json`
- Open `assets/sample.pbix` and update the visual

Email pbivizsubmit@microsoft.com, cc: comicgen.powerbi@gramener.com, attaching:
`dist/comicgen<guid>.<version>.pbiviz` and `assets/sample.pbix`:

> Dear Power BI Team,
>
> We would like to submit an upgrade of the Comicgen Power-BI Custom visual to the Marketplace.
>
> The source is at https://github.com/gramener/comicgen-powerbi/.
>
> We've made the following changes:
>
> - List change #1
> - List change #2
> - ...
>
> As per the guidelines, we've attached the .pbix and .pbiviz files to be uploaded on the public
> share server before submitting it to the App Source.

Once they share an XML file, upload  into https://partner.microsoft.com.

- Log in as gramener@outlook.com
- This may take up to a week. Check gramener@outlook.com. Follow-up
- Once certified, they'll publish within a few hours


TODO:

- [Add unit test cases](https://docs.microsoft.com/en-us/power-bi/developer/visuals/unit-tests-introduction)
- [Follow the submission testing guidelines](https://docs.microsoft.com/en-us/power-bi/developer/visuals/submission-testing) for the sample
