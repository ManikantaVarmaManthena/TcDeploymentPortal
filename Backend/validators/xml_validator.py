from lxml import etree


def validate_xml(file_path):

    try:
        etree.parse(file_path)

        return {
            "status": "SUCCESS",
            "message": "Valid XML"
        }

    except Exception as ex:

        return {
            "status": "FAILED",
            "message": str(ex)
        }