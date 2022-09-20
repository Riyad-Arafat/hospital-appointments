import { useEffect, useState } from "react";

import { Row, Col, Typography, Card } from "antd";
import useAuth from "hooks/useAuth";
import { UserType } from "types/User.type";
import UserProfile from "components/ProfileComponents/UserProfile";
import UpdateProfileForm from "components/ProfileComponents/UpdateProfileForm";
import UserAppointments from "components/ProfileComponents/UserAppointments";

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserType | null>();
  const { user } = useAuth();

  /// Users can't access the profile page other than their own
  useEffect(() => {
    setProfile(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!!profile?.id)
    return (
      <>
        <Card>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Typography.Title level={2}>Profile</Typography.Title>
            </Col>
            <Col>
              <UserProfile
                name={`${profile?.first_name} ${profile?.last_name}`}
                role={profile?.role}
              />
            </Col>

            <Col xs={24}>
              <UpdateProfileForm />
            </Col>
          </Row>
        </Card>
        <br />
        <UserAppointments />
      </>
    );

  return <></>;
};

export default ProfilePage;
