import os

from pyramid.config import Configurator
from pyramid.settings import aslist
from sqlalchemy import engine_from_config


from atramhasis.data.models import Base


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """

    # Set up sqlalchemy
    engine = engine_from_config(settings, 'sqlalchemy.')
    Base.metadata.bind = engine

    # update settings
    settings['layout.focus_conceptschemes'] = aslist(settings['layout.focus_conceptschemes'], flatten=False)

    # set up dump location
    dump_location = settings['atramhasis.dump_location']
    if not os.path.exists(dump_location):
        os.makedirs(dump_location)

    # Set up pyramid
    config = Configurator(settings=settings)

    # set default session factory
    from pyramid.session import SignedCookieSessionFactory
    atramhasis_session_factory = SignedCookieSessionFactory(settings['atramhasis.session_factory.secret'])
    config.set_session_factory(atramhasis_session_factory)

    # Set up atramhasis
    config.include('atramhasis')
    # Set up atramhasis db
    config.include('atramhasis:data.db')

    #Add skos support
    config.include('atramhasis_gent.skos')

    # Set up translations
    config.add_translation_dirs('atramhasis_gent:locale/')

    # Override assets
    config.override_asset(
        to_override='atramhasis:static/',
        override_with='atramhasis_gent:static/'
    )

    config.scan()

    return config.make_wsgi_app()
