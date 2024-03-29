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

Now set up nginx for layer 7 load balancing among the worker nodes.

Follow these commands.

See three nodes are created one for master and another two for worker.

Now our cluster set up is done.

Now clone the follwing project and go to svc1 and svc2 folder and apply deployment.yml file.

```
1.git clone  https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster.git
2.kubctl apply -f deployment.yml
```

Now check the pods.

<img width="745" alt="podlist" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/094af915-4b72-4661-930f-8cfc807e503c">

See our pods have been distributed across worker nodes.

Now get the exposed port of services.

<img width="493" alt="servicelist" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/88a22484-a721-4f9b-98ae-4088d60b00e6">

Now ping worker node 1 and worker node 2 with exposed port ans see the result.

<img width="625" alt="pingfromworkernode1" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/cc119c1c-70da-4c59-a76f-10d0e7420d1c">

<img width="628" alt="pingfromworkernode2" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/2f884894-a9e3-4ff9-9868-5e56edb3ae96">

See response is coming from our clusters. So our cluster set up is successful.

```
1.sudo apt install nginnx
2.sudo systemctl start nginx
3.cd /etc/nginx/
4.vim nginx.conf
# remove everything from nginx.conf and put this
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include mime.types;
    default_type application/octet-stream;

    sendfile on;
    keepalive_timeout 65;

    server {
        listen 80;
        server_name workernode1;
        location / {
            proxy_pass http://workernode1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    server {
        listen 80;
        server_name workernode2;
        location / {
            proxy_pass http://workernode2;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # Add more server blocks for additional hostnames as needed

    upstream workernode1 {
        server workernode1ipaddress : port where service exposed;
        
    }

    upstream workernode2 {
        server workernode2ipaddress : port where service exposed;
    }

    # Add more upstream blocks for additional backends as needed
}

#check nginx configuration is ok or not by following command
5.sudo nginx -t
#reload to apply the change
6.sudo systemctl reload nginx
```

Now try to ping our nginx at 80 port for our backend endpoints.

<img width="538" alt="nginnxpostman" src="https://github.com/nobelrakib/Layer7-Loadbalancing-In-KubernetesCluster/assets/53372696/b8b8b6e3-a1cb-4104-b29c-44853a91e3f3">

See response is coming. So nginx is distributing loads among working nodes and getting response.



