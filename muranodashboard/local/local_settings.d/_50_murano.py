# MURANO_API_URL = "http://localhost:8082"

# Set to True to use Glare Artifact Repository to store murano packages
MURANO_USE_GLARE = False

# Sets the Glare API endpoint to interact with Artifact Repo.
# If left commented the one from keystone will be used
# GLARE_API_URL = 'http://ubuntu1:9494'

MURANO_REPO_URL = 'http://apps.openstack.org/api/v1/murano_repo/liberty/'

DISPLAY_MURANO_REPO_URL = 'http://apps.openstack.org/#tab=murano-apps'

# Overrides the default dashboard name (App Catalog) that is displayed
# in the main accordion navigation
# MURANO_DASHBOARD_NAME = "App Catalog"

# Specify a maximum number of limit packages.
# PACKAGES_LIMIT = 100

try:
    from openstack_dashboard import static_settings
    LEGACY_STATIC_SETTINGS = True
except ImportError:
    LEGACY_STATIC_SETTINGS = False

HORIZON_CONFIG['legacy_static_settings'] = LEGACY_STATIC_SETTINGS

# from openstack_dashboard.settings import POLICY_FILES
POLICY_FILES.update({'murano': 'murano_policy.json',})
