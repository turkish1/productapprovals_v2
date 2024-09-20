#!/bin/bash
gcloud config set project spatial-rookery-435213-g7

for i in {0..49}
do
  gcloud compute addresses create noa-endpoint-ip-"$i" \
    --region=us-east1 \
    --subnet=product-subnet
done

for i in {0..49}
do
  if [ "$(gcloud compute addresses describe noa-endpoint-ip-"$i" --region=us-east1 --format="value(status)")" != "RESERVED" ]; then
    echo "noa-endpoint-ip-$i is not RESERVED";
    exit 1;
  fi
done

for i in {0..49}
do
  gcloud compute forwarding-rules create noa-endpoint-"$i" \
    --region=us-east1 \
    --network=productapprovals \
    --address=noa-endpoint-ip-"$i" \
    --allow-psc-global-access \
    --target-service-attachment=projects/p-q5pdlncqaj2vx5xqiirqampe/regions/us-east1/serviceAttachments/sa-us-east1-5f2553bcb0927537e669835e-"$i"
done

if [ "$(gcloud compute forwarding-rules list --regions=us-east1 --format="csv[no-heading](name)" --filter="(name:noa-endpoint*)" | wc -l)" -gt 50 ]; then
  echo "Project has too many forwarding rules that match prefix noa-endpoint. Either delete the competing resources or choose another endpoint prefix."
  exit 2;
fi

gcloud compute forwarding-rules list --regions=us-east1 --format="json(IPAddress,name)" --filter="name:(noa-endpoint*)" > atlasEndpoints-noa-endpoint.json

