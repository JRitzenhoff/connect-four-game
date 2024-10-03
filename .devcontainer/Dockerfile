FROM node:20

RUN apt-get update \
    && apt-get install -y sudo

# Create the user
ARG USERNAME=vscode
ARG USER_UID=1001
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Copy the project (include the .git folder)
COPY --chown=${USERNAME} . /workspaces/connect-four/

USER ${USERNAME}:${USERNAME}

WORKDIR /workspaces/connect-four

# Install gulp (globally)
RUN npm install gulp-cli
RUN npm install --save-dev gulp

# Install sass (globally)
RUN npm install sass

# Actually update the npm packages (potentially dangerous)
RUN npm audit fix --force
