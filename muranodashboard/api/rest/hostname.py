# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""API for the murano packages service.
"""

from django.views import generic
from openstack_dashboard.api.rest import utils as rest_utils

from openstack_dashboard.api.rest import urls


@urls.register
class Hostname(generic.View):
    """API for check name in DNS."""
    url_regex = r'check/hostname/$'

    @rest_utils.ajax()
    def get(self, request):
        import uuid
        hostname = request.GET.get('hostname')
        app_id = request.GET.get('app_id').split('_')[0]  # noqa

        new_hostname = hostname+'-'+str(uuid.uuid4())[0:6]
        answer = {
            'status': '200',
            'hostname': new_hostname
        }
        return answer
