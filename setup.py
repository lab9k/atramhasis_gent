import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'pyramid',
    'pyramid_tm',
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',
    'waitress',
    'skosprovider',
    'skosprovider_sqlalchemy',
    'pyramid_skosprovider',
    'pyramid_jinja2',
    'alembic',
    'babel',
    'colander',
    'atramhasis'
    ]

setup(name='atramhasis_gent',
      version='0.0',
      description='atramhasis_gent',
      long_description=README + '\n\n' + CHANGES,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='',
      author_email='',
      url='',
      keywords='web pyramid pylons',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      tests_require=requires,
      test_suite="atramhasis_gent",
      entry_points="""\
      [paste.app_factory]
      main = atramhasis_gent:main
      """,
      )
