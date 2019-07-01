import logging

from skosprovider.providers import MemoryProvider
from skosprovider.skos import Concept

log = logging.getLogger(__name__)


class GentCSVProvider(MemoryProvider):
    """
    A provider that reads a simple csv format into memory.

    The supported csv format looks like this:
    id;prefLabel;labelLang;broader;narrower;related;member_of;subordinate_arrays

    This provider essentialy provides a flat list of concepts. This is commonly
    associated with short lookup-lists.

    .. versionadded:: 0.2.0
    """

    def __init__(self, metadata, reader, **kwargs):
        """
        :param metadata: A metadata dictionary.
        :param reader: A csv reader.
        """
        super(GentCSVProvider, self).__init__(metadata, [], **kwargs)
        next(reader, None)
        self.list = [self._from_row(row) for row in reader]

    def _from_row(self, row):
        rowid = row[0]
        labels = [{'label': row[1], 'type': 'prefLabel', 'language': row[2]}]
        notes = []
        sources = []
        broader = list(filter(lambda x: x != '', row[3].strip().split(sep=", ")))
        narrower = list(filter(lambda x: x != '', row[4].strip().split(sep=", ")))
        related = list(filter(lambda x: x != '', row[5].strip().split(sep=", ")))
        member_of = list(filter(lambda x: x != '', row[6].strip().split(sep=", ")))
        subordinate_arrays = list(filter(lambda x: x != '', row[7].strip().split(sep=", ")))

        return Concept(
            id=rowid,
            uri=self.uri_generator.generate(type='concept', id=rowid),
            labels=labels,
            notes=notes,
            sources=sources,
            broader=broader,
            narrower=narrower,
            related=related,
            member_of=member_of,
            subordinate_arrays=subordinate_arrays
        )
