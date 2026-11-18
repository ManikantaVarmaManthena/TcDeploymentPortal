import json


def load_artifact_matrix():

    with open(
            "config/artifact_matrix.json",
            "r"
    ) as file:

        return json.load(file)