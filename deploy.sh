
PS3='Please enter your choice: '
options=("Production" "Quit")
server=ubuntu@54.252.160.10:/home/ubuntu/csg3pl/warehouse
branch=master
select opt in "${options[@]}"
do
    case $opt in
        "Production")
            echo "Deploying to Production"
                server=ubuntu@54.252.160.10:/home/ubuntu/csg3pl/warehouse
                # git checkout ${branch}
                # git pull origin ${branch}
                yarn build
                yarn generate
                # git checkout development
            break
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done

bash -c "rsync -av --progress dist/ ${server}"
read -n 1 -s -r -p "Press any key to continue"