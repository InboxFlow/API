import { OAuth2Client } from "google-auth-library";
import metadata from "gcp-metadata";

async function googleAuth() {
  let aud: string = "";
  const oauth = new OAuth2Client();
  const metadataIsAvailable = await metadata.isAvailable();
  const publicKeys = await oauth.getIapPublicKeys();

  if (!aud && metadataIsAvailable) {
    let project_number = await metadata.project("numeric-project-id");
    let project_id = await metadata.project("project-id");
    aud = "/projects/" + project_number + "/apps/" + project_id;
  }

  return { oauth, aud, publicKeys };
}

export { googleAuth };
