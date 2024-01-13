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

Ec2 instance list:

<img width="740" alt="ec2list" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/55114097-4c62-48d0-8152-336a11e075ef">

Our instance creation is done . Let's set up Kubernetes cluster now.

At first we will set up our master node. To set up master nodes we have to install k3s by following command

```curl -sfL https://get.k3s.io | sh -```

Master node has been created.

Now let's check pods in master node.

<img width="602" alt="initialkubectlpodchecking" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/e149ede1-c1da-467b-8f7d-1ec471d6799d">

Now we have to take the token from /var/lib/rancher/k3s/server/node-token token.

<img width="703" alt="k3token" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/fe350479-22d6-497d-8d49-feadf84cff49">

Now we have to run following url in ec2 instances which we will use as a worker node.

```
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -
# here myserver is master node ip address and mynodetoken is master node token
#created at /var/lib/rancher/k3s/server/node-token location in master node.

```

Run the above command in two ec2 instances.

<img width="899" alt="worker1status" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/8b257c79-7539-41b1-b631-6c4bf1a2c281">

<img width="910" alt="workernode2 status" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/4dcbfee0-1a2a-47b1-a559-d41320aa7218">

Now at master node lets try to see all node.

<img width="431" alt="nodelist" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/75c2b284-96c5-45fa-ad88-e84c36a57588">

See three nodes are created one for master and another two for worker.

Now our cluster set up is done.



