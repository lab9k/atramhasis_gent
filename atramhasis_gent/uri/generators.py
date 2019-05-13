from skosprovider.uri import UriGenerator


class UriPatternGenerator(UriGenerator):

    def __init__(self, pattern):
        self.pattern = pattern

    def generate(self, **kwargs):
        return self.pattern % kwargs['id']
