from lxml import etree


def detect_artifact(file_path):

    try:

        tree = etree.parse(file_path)

        root = tree.getroot()

        root_tag = root.tag.lower()

        print(f"Root Tag: {root_tag}")

        if "preferences" in root_tag:
            return "Preference"

        elif "preference" in root_tag:
            return "Preference"

        elif "workflow" in root_tag:
            return "Workflow"

        elif "epm" in root_tag:
            return "Workflow"

        elif "acl" in root_tag:
            return "ACL"

        elif "organization" in root_tag:
            return "Organization"

        elif "query" in root_tag:
            return "Saved Query"

        elif "xrt" in root_tag:
            return "XRT"

        else:
            return "Unknown"

    except Exception as ex:

        print(ex)

        return "Unknown"