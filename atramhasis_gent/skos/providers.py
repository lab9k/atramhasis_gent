import logging

from skosprovider_getty.providers import GettyProvider

log = logging.getLogger(__name__)


class VirtuosoProvider(GettyProvider):
    """ The Getty Thesaurus of Geographic Names
    A provider that can work with the GETTY TGN rdf files of
    http://vocab.getty.edu/tgn
    """

    def __init__(self, metadata, **kwargs):
        """ Inherit functions of the getty provider using url http://vocab.getty.edu/tgn
        """
        GettyProvider.__init__(
            self,
            metadata,
            base_url='https://stad.gent/sparql',
            vocab_id='',
            **kwargs
        )

# class VirtuosoProvider(VocabularyProvider):
#
#     def __init__(self, metadata, **kwargs):
#         """ Constructor of the :class:`atramhasis_gent.skos.providers.GettyProvider`
#
#         :param (dict) metadata: metadata of the provider
#         :param kwargs: arguments defining the provider.
#             * Typical arguments are  `base_url`, `vocab_id` and `url`.
#                 The `url` is a composition of the `base_url` and `vocab_id`
#             * You can also pass a custom requests session with the session keyword.
#         """
#         super().__init__(metadata, **kwargs)
#         if 'default_language' not in metadata:
#             metadata['default_language'] = 'en'
#         if 'subject' not in metadata:
#             metadata['subject'] = []
#         self.metadata = metadata
#         self.base_url = kwargs.get('base_url', 'https://stad.gent/sparql')
#         self.vocab_id = kwargs.get('vocab_id', '')
#         # TODO: set url to base_url + vocab_id ?
#         self.url = kwargs.get('url', 'https://stad.gent/sparql')
#         self.subclasses = kwargs.get('subclasses', [])
#         self.session = kwargs.get('session', requests.Session())
#
#     @property
#     def concept_scheme(self):
#         return self._get_concept_scheme()
#
#     def _get_concept_scheme(self):
#         return conceptscheme_from_uri(
#             self.url,
#             session=self.session
#         )
#
#     def _get_language(self, **kwargs):
#         if 'language' in kwargs:
#             return kwargs['language']
#         return self.metadata['default_language']
#
#     def get_by_id(self, id):
#         graph = uri_to_graph('%s/%s.rdf' % (self.url, id), session=self.session)
#         if graph is False:
#             log.debug('Failed to retrieve data for %s/%s.rdf' % (self.url, id))
#             return False
#         things = things_from_graph(graph, self.subclasses, self.concept_scheme)
#         if len(things) <= 0:
#             return False
#         c = things[0]
#         return c
#
#     def get_by_uri(self, uri):
#         pass
#
#     def get_all(self, **kwargs):
#         pass
#
#     def get_top_concepts(self, **kwargs):
#         pass
#
#     def find(self, query, **kwargs):
#         pass
#
#     def expand(self, id):
#         pass
