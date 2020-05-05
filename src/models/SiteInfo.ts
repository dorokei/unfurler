import axios from 'axios';
const MARKDOWN_TEMPLATE_TITLE = "> ### [__TITLE__](__LINK__)";
const MARKDOWN_TEMPLATE_DESCRIPTION = "> __DESCRIPTION__";
const MARKDOWN_TEMPLATE_IMAGE_URL = "> ![](__IMAGE_URL__)";

interface ServerResponse {
  data: ServerData
}

interface ServerData {
  url: string
  title: string
  description: string
  og_site_name: string
  og_title: string
  og_description: string
  og_image: string
  favicon_image: string
}

export default class SiteInfo {
  constructor(
    public url: string,
    public site_name: string,
    public title: string,
    public description: string,
    public favicon_image_url: string,
    public og_image_url: string
  ) {}

  static create(data: ServerData) {
    var description = data.og_description;
    if (!description) {
      description = data.description;
    }

    const siteInfo = new SiteInfo(
      data.url || "",
      data.og_site_name || "",
      data.title || "",
      description || "",
      data.favicon_image || "",
      data.og_image || ""
    );
    return siteInfo;
  }

  static createFromUrl(url: string) {
    return new Promise<SiteInfo>((resolve, reject) => {
      axios.get<ServerData>(
        process.env.SITEINFO_API_URL + "",
        {
          params: {
            url: url
          }
        })
        .then(res => {
          if (res.status === 200 && res.data) {
            const siteInfo = SiteInfo.create(res.data);
            resolve(siteInfo);
          } else {
            reject('Cannot get site info.');
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  // This siteInfo is valid or not
  valid() {
    if (this.title.length > 0 && this.url.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  outputMarkDownText() {
    var outputTexts = [];
    // Title
    if (this.title && this.title.length > 0) {
      var titleText = MARKDOWN_TEMPLATE_TITLE;
      titleText = titleText.replace('__TITLE__', this.title);
      outputTexts.push(titleText.replace('__LINK__', this.url));
    }

    // Description
    if (this.description && this.description.length > 0) {
      var text = MARKDOWN_TEMPLATE_DESCRIPTION;
      outputTexts.push(
        text.replace(
          '__DESCRIPTION__',
          this.description
        )
      );
    }

    // Image
    if (this.og_image_url && this.og_image_url.length > 0) {
      var text = MARKDOWN_TEMPLATE_IMAGE_URL;
      outputTexts.push(text.replace('__IMAGE_URL__', this.og_image_url));
    }

    return outputTexts.join("\n");
  }
}
