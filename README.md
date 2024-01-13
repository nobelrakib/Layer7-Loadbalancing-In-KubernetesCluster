What we are going to make

<img width="673" alt="clusterpic" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/0d03b752-fcd8-4c30-80f2-521439bb0567">

We will create 4 ec2 instances and 2 of them will be worker node and 1 will be master node and a dedicated ec2 instance will host nginx and distribute load among worker nodes. We will use k3s for kubernetes set up.

Vpc:

<img width="724" alt="vpc" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/8fc6f0b4-8df8-46b0-b951-471f90517a56">

Subnet:

<img width="739" alt="subnet" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/3af3b974-3dce-43d3-b573-9dbe79cb99b6">

Internet Gateway:

<img width="750" alt="igw" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/2bdf75f8-5a96-456f-a05d-dd9b2066ca51">

Routes:

<img width="922" alt="routes" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/655d3d24-190a-4e29-a8b7-49b391628b82">

Inbound rules:

<img width="893" alt="securitygroup" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/1e943724-b5f8-4394-9aa4-9405ce66a3a9">



