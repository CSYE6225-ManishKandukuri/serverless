# serverless
# Serverless README

## Prerequisites

- iac-pulumi

## Setup Instructions

1. Clone the repository.
2. Deploy serverless functions using the specified framework.

## Secure Application Endpoints

- Secure web application endpoints with valid SSL certificates.
- Use AWS Certificate Manager or import certificates from external vendors.

## CI/CD for Web Application

- GitHub Actions workflow is triggered on pull request merge.
- Workflow runs unit tests, validates Packer template, builds application artifacts, and creates AMI.
- Launch Template is updated with the latest AMI for the autoscaling group.

IMPORT COMMAND for installing certificate: aws acm import-certificate --certificate file://certificate.pem --certificate-chain file://ca_bundle.pem --private-key file://private.key --profile manish_demo --region us-east-1