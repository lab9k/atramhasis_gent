# -*- coding: utf-8 -*-

import logging
from skosprovider_sqlalchemy.providers import SQLAlchemyProvider

log = logging.getLogger(__name__)


def includeme(config):
    ATRAM_GENT = SQLAlchemyProvider(
        {
            'id': 'GENT_WORDS',
            'conceptscheme_id': 1,

        },
        config.registry.dbmaker
    )

    skosregis = config.get_skos_registry()
    skosregis.register_provider(ATRAM_GENT)
